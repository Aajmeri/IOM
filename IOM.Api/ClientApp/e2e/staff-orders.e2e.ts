import { test, expect } from '@playwright/test';
import {
  ADMIN, createProduct, dayFromToday, getOrderAs, loginViaUi, placePayLaterOrderViaApi, registerClientViaApi, slotStart, unique
} from './support';

test.describe('Staff order handling', () => {
  test('staff reschedule an order (client is emailed) and then accept it', async ({ page, request }) => {
    // Each date is computed once, so a run that crosses midnight can't compare two different "todays".
    const originalSlot = slotStart(6, 10);
    const newDay = dayFromToday(8);
    const expectedNewSlot = `${newDay}T14:00:00`;
    const productId = await createProduct(request, unique('E2E Staff'), 9);
    const client = await registerClientViaApi(request);
    const order = await placePayLaterOrderViaApi(request, client, productId, originalSlot);

    await loginViaUi(page, ADMIN.email, ADMIN.password);
    await page.goto('/order-approvals');
    const row = page.locator('tbody tr').filter({ hasText: order.number });
    await expect(row).toContainText('Unpaid');
    await row.getByRole('link', { name: /View/ }).click();

    await expect(page.getByRole('heading', { name: `Order ${order.number}` })).toBeVisible();
    // The date can only change through Reschedule, so the client is always told.
    await expect(page.locator('input[type="datetime-local"]')).toHaveCount(0);

    await page.locator('#rescheduleDate').fill(newDay);
    const slotButtons = page.locator('.card', { has: page.getByRole('heading', { name: 'Reschedule' }) })
      .locator('button').filter({ hasText: '–' });
    await expect(slotButtons.first()).toBeVisible();
    await slotButtons.filter({ hasText: /^\s*2:00\s*PM/ }).click();
    await page.locator('#rescheduleReason').fill('Delivery van in for repair');
    await page.getByRole('button', { name: /Reschedule & Email Client/ }).click();

    await expect(page.getByText('the client has been emailed')).toBeVisible();

    await page.getByRole('button', { name: 'Accept' }).click();
    await expect(page.getByText(`Order ${order.number} is now Approved.`)).toBeVisible();

    // What the client now sees through the API.
    const seen = await getOrderAs(request, client, order.id);
    expect(seen.status).toBe('Approved');
    expect(seen.scheduledDate).toBe(expectedNewSlot);
    expect(seen.adminNotes).toBe('Delivery van in for repair');
  });

  test('a rejected order offers no reschedule option', async ({ page, request }) => {
    const productId = await createProduct(request, unique('E2E Reject'), 2);
    const client = await registerClientViaApi(request);
    const order = await placePayLaterOrderViaApi(request, client, productId, slotStart(7, 12));

    await loginViaUi(page, ADMIN.email, ADMIN.password);
    await page.goto(`/order-approvals/${order.id}`);
    await page.getByPlaceholder(/required to reject/).fill('Out of stock');
    await page.getByRole('button', { name: 'Reject' }).click();
    await expect(page.getByText(`Order ${order.number} is now Rejected.`)).toBeVisible();

    await page.goto(`/order-approvals/${order.id}`);
    await expect(page.getByText('It can no longer be changed.')).toBeVisible();
    await expect(page.locator('#rescheduleDate')).toHaveCount(0);
  });
});
