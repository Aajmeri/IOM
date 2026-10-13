import { APIRequestContext, Page, expect } from '@playwright/test';

export const ADMIN = { email: 'admin@admin.com', password: 'Admin123!' };
export const PASSWORD = 'Client123!';
export const VISA_OK = '4242 4242 4242 4242';
export const VISA_DECLINED = '4000 0000 0000 0002';

let counter = 0;
/** Unique-per-run suffix so tests never collide on names/emails. */
export function unique(prefix: string): string {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter}`;
}

/** Local calendar date `daysFromToday` ahead, as YYYY-MM-DD (what FullCalendar and <input type=date> use). */
export function dayFromToday(daysFromToday: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** A delivery-slot start as the API expects it (local time, no offset), e.g. 2026-10-20T10:00:00. */
export function slotStart(daysFromToday: number, hour: number): string {
  return `${dayFromToday(daysFromToday)}T${String(hour).padStart(2, '0')}:00:00`;
}

// ---- API shortcuts for test setup --------------------------------------------------------------

async function token(request: APIRequestContext, email: string, password: string): Promise<string> {
  const response = await request.post('/api/auth/login', { data: { email, password } });
  expect(response.ok(), `login as ${email}`).toBeTruthy();
  return (await response.json()).token;
}

const auth = (t: string) => ({ Authorization: `Bearer ${t}` });

export async function createProduct(request: APIRequestContext, name: string, price: number): Promise<string> {
  const admin = await token(request, ADMIN.email, ADMIN.password);
  const supplier = await request.post('/api/suppliers', { headers: auth(admin), data: { name: unique('E2E Supplier') } });
  expect(supplier.ok()).toBeTruthy();
  const product = await request.post('/api/products', {
    headers: auth(admin),
    data: { name, price, quantity: 100, visibility: true, description: 'Created by the Playwright suite', supplierId: (await supplier.json()).id }
  });
  expect(product.ok()).toBeTruthy();
  return (await product.json()).id;
}

export interface Client { email: string; password: string; token: string; }

export async function registerClientViaApi(request: APIRequestContext): Promise<Client> {
  const email = `${unique('client')}@example.com`;
  const response = await request.post('/api/auth/register', {
    data: { name: 'E2E Client', email, password: PASSWORD, confirmPassword: PASSWORD }
  });
  expect(response.ok()).toBeTruthy();
  return { email, password: PASSWORD, token: (await response.json()).token };
}

export async function placePayLaterOrderViaApi(
  request: APIRequestContext, client: Client, productId: string, scheduledDate: string
): Promise<{ id: string; number: string }> {
  const response = await request.post('/api/orders', {
    headers: auth(client.token),
    data: { scheduledDate, items: [{ productId, quantity: 1 }], payLater: true }
  });
  expect(response.status()).toBe(201);
  return response.json();
}

export async function getOrderAs(request: APIRequestContext, client: Client, orderId: string) {
  const response = await request.get(`/api/orders/${orderId}`, { headers: auth(client.token) });
  expect(response.ok()).toBeTruthy();
  return response.json();
}

// ---- UI steps ----------------------------------------------------------------------------------

export async function loginViaUi(page: Page, email: string, password: string): Promise<void> {
  await page.goto('/login');
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).not.toHaveURL(/\/login/);
}

export async function registerViaUi(page: Page): Promise<{ email: string; password: string }> {
  const email = `${unique('ui-client')}@example.com`;
  await page.goto('/register');
  await page.getByPlaceholder('Full Name').fill('Playwright Client');
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password', { exact: true }).fill(PASSWORD);
  await page.getByPlaceholder('Confirm Password').fill(PASSWORD);
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/\/shop$/);
  return { email, password: PASSWORD };
}

export async function addToBasket(page: Page, productName: string, quantity: number): Promise<void> {
  await page.getByPlaceholder(/Search products/).fill(productName);
  const card = page.locator('.card', { has: page.getByRole('heading', { name: productName }) }).last();
  await card.locator('input[type="number"]').fill(String(quantity));
  await card.getByRole('button', { name: /Add to basket/ }).click();
  await expect(card.getByRole('button', { name: /Added/ })).toBeVisible();
}

/** On the delivery schedule page: pages the month view forward to `date` and clicks that day. */
export async function pickDeliveryDay(page: Page, date: string): Promise<void> {
  // Availability arrives asynchronously and is drawn as green/grey background events. Clicking a
  // day before it has loaded shows "no delivery times", so wait for the shading each time.
  const availabilityLoaded = () => expect(page.locator('.fc-bg-event').first()).toBeAttached();
  await availabilityLoaded();
  const cell = page.locator(`td.fc-daygrid-day[data-date="${date}"]:not(.fc-day-other)`);
  for (let i = 0; i < 3 && (await cell.count()) === 0; i++) {
    await page.locator('.fc-next-button').click();
    await availabilityLoaded();
  }
  await cell.locator('.fc-daygrid-day-frame').click();
  await expect(page.getByRole('heading', { name: /Available times/ })).toBeVisible();
}

export async function fillCard(page: Page, cardNumber: string): Promise<void> {
  await page.locator('#cardholderName').fill('Playwright Client');
  await page.locator('#cardNumber').fill(cardNumber);
  await page.locator('#expiryMonth').selectOption({ label: '12' });
  await page.locator('#expiryYear').selectOption({ label: String(new Date().getFullYear() + 2) });
  await page.locator('#cvc').fill('123');
}
