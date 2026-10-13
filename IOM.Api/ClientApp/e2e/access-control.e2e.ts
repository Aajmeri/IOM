import { test, expect } from '@playwright/test';
import { ADMIN, loginViaUi, registerClientViaApi } from './support';

test.describe('Access control in the browser', () => {
  test('signed-out visitors are sent to the login page', async ({ page }) => {
    await page.goto('/shop');
    await expect(page).toHaveURL(/\/login/);
  });

  test('a client cannot open staff or admin pages', async ({ page, request }) => {
    const client = await registerClientViaApi(request);
    await loginViaUi(page, client.email, client.password);
    await expect(page).toHaveURL(/\/shop$/);

    // Staff pages bounce a client back to their shop (staffGuard treats it as a navigation slip)...
    for (const path of ['/order-approvals', '/suppliers', '/deliveries', '/products']) {
      await page.goto(path);
      await expect(page).toHaveURL(/\/shop$/);
      await expect(page.getByRole('heading', { name: 'Shop', exact: true })).toBeVisible();
    }

    // ...while the admin-only Users page shows Access Denied.
    await page.goto('/users');
    await expect(page.getByRole('heading', { name: /Access Denied/ })).toBeVisible();
  });

  test('staff cannot use the client shop', async ({ page }) => {
    await loginViaUi(page, ADMIN.email, ADMIN.password);
    await expect(page).toHaveURL(/\/products$/);

    await page.goto('/shop/checkout');
    await expect(page.getByRole('heading', { name: /Access Denied/ })).toBeVisible();
  });

  test('a deactivated account can no longer sign in', async ({ page, request }) => {
    const client = await registerClientViaApi(request);
    const adminLogin = await request.post('/api/auth/login', { data: ADMIN });
    const headers = { Authorization: `Bearer ${(await adminLogin.json()).token}` };
    const users = await (await request.get('/api/users', { headers })).json();
    const user = users.find((u: any) => u.email === client.email);
    expect(user.password).toBeUndefined();
    await request.put(`/api/users/${user.id}`, { headers, data: { name: user.name, role: 'Client', active: false } });

    await page.goto('/login');
    await page.getByPlaceholder('Email').fill(client.email);
    await page.getByPlaceholder('Password').fill(client.password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByText('Invalid email or password.')).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });
});
