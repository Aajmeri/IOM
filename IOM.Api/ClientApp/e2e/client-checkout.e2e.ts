import { test, expect } from '@playwright/test';
import {
  VISA_DECLINED, VISA_OK, addToBasket, createProduct, fillCard, pickDeliveryDay, registerViaUi, unique, dayFromToday
} from './support';

test.describe('Client shopping and checkout', () => {
  test('shop → basket → schedule → pay by card → emailed, printable receipt', async ({ page, request }) => {
    const productName = unique('E2E Widget');
    await createProduct(request, productName, 12.5);
    const { email } = await registerViaUi(page);

    await addToBasket(page, productName, 2);
    await page.getByRole('link', { name: /Basket/ }).first().click();

    await expect(page).toHaveURL(/\/shop\/basket/);
    await expect(page.getByRole('cell', { name: productName })).toBeVisible();
    await expect(page.locator('tfoot')).toContainText('$25.00');
    await page.getByRole('button', { name: /Schedule Delivery/ }).click();

    await pickDeliveryDay(page, dayFromToday(3));
    await page.locator('.col-md-5 button:not([disabled])').filter({ hasText: '–' }).first().click();
    await page.getByRole('button', { name: /Continue to Payment/ }).click();

    await expect(page).toHaveURL(/\/shop\/checkout\?start=/);
    await expect(page.getByTestId('checkout-total')).toHaveText('$25.00');
    await fillCard(page, VISA_OK);
    await page.getByRole('button', { name: 'Pay $25.00' }).click();

    // Receipt page
    await expect(page).toHaveURL(/\/shop\/orders\/[0-9a-f-]+\/receipt\?placed=1/);
    await expect(page.getByText('Payment successful.')).toBeVisible();
    await expect(page.getByText(`emailed to ${email}`)).toBeVisible();
    const receipt = page.locator('.receipt');
    await expect(receipt).toContainText(productName);
    await expect(receipt).toContainText('PAID');
    await expect(page.getByTestId('receipt-total')).toHaveText('$25.00');
    await expect(receipt).toContainText('Visa ending in 4242');
    await expect(receipt).not.toContainText('4242 4242 4242 4242');

    // Print: the button opens the browser print dialog...
    await page.evaluate(() => { (window as any).__printed = false; window.print = () => { (window as any).__printed = true; }; });
    await page.getByRole('button', { name: /Print Receipt/ }).click();
    expect(await page.evaluate(() => (window as any).__printed)).toBe(true);

    // ...and the print stylesheet hides the app chrome and the action buttons, leaving the receipt.
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.main-sidebar')).toBeHidden();
    await expect(page.locator('.main-header')).toBeHidden();
    await expect(page.getByRole('button', { name: /Print Receipt/ })).toBeHidden();
    await expect(receipt).toBeVisible();
    await page.emulateMedia({ media: 'screen' });

    await page.getByRole('button', { name: /Email me a copy/ }).click();
    await expect(page.getByText(`A copy of this receipt was sent to ${email}.`)).toBeVisible();

    // My Orders lists it as paid, with a working receipt link and no "Pay now".
    await page.getByRole('link', { name: /My Orders/ }).first().click();
    const row = page.locator('tbody tr').filter({ hasText: '$25.00' }).first();
    await expect(row).toContainText('Paid');
    await expect(row.getByRole('link', { name: /Pay now/ })).toHaveCount(0);
    await row.getByRole('link', { name: /Receipt/ }).click();
    await expect(page.getByTestId('receipt-total')).toHaveText('$25.00');
  });

  test('a declined card shows the reason and keeps the basket', async ({ page, request }) => {
    const productName = unique('E2E Declined');
    await createProduct(request, productName, 4);
    await registerViaUi(page);
    await addToBasket(page, productName, 1);
    await page.getByRole('link', { name: /Basket/ }).first().click();
    await page.getByRole('button', { name: /Schedule Delivery/ }).click();
    await pickDeliveryDay(page, dayFromToday(4));
    await page.locator('.col-md-5 button:not([disabled])').filter({ hasText: '–' }).first().click();
    await page.getByRole('button', { name: /Continue to Payment/ }).click();

    await fillCard(page, VISA_DECLINED);
    await page.getByRole('button', { name: 'Pay $4.00' }).click();

    await expect(page.getByRole('alert')).toContainText('Your card was declined.');
    await expect(page).toHaveURL(/\/shop\/checkout/);
    await expect(page.getByTestId('checkout-total')).toHaveText('$4.00');
    await expect(page.locator('#cvc')).toHaveValue('');
  });

  test('invalid card details are caught before anything is sent', async ({ page, request }) => {
    const productName = unique('E2E Invalid');
    await createProduct(request, productName, 3);
    await registerViaUi(page);
    await addToBasket(page, productName, 1);
    await page.getByRole('link', { name: /Basket/ }).first().click();
    await page.getByRole('button', { name: /Schedule Delivery/ }).click();
    await pickDeliveryDay(page, dayFromToday(4));
    await page.locator('.col-md-5 button:not([disabled])').filter({ hasText: '–' }).first().click();
    await page.getByRole('button', { name: /Continue to Payment/ }).click();

    let orderPosted = false;
    page.on('request', r => { if (r.method() === 'POST' && r.url().endsWith('/api/orders')) orderPosted = true; });
    await fillCard(page, '4242 4242 4242 4241');
    await page.getByRole('button', { name: 'Pay $3.00' }).click();

    await expect(page.getByText('That card number is not valid.')).toBeVisible();
    expect(orderPosted).toBe(false);
  });

  test('pay later: place the order unpaid, then pay it from My Orders', async ({ page, request }) => {
    const productName = unique('E2E PayLater');
    await createProduct(request, productName, 7.5);
    const { email } = await registerViaUi(page);
    await addToBasket(page, productName, 2);
    await page.getByRole('link', { name: /Basket/ }).first().click();
    await page.getByRole('button', { name: /Schedule Delivery/ }).click();
    await pickDeliveryDay(page, dayFromToday(5));
    await page.locator('.col-md-5 button:not([disabled])').filter({ hasText: '–' }).first().click();
    await page.getByRole('button', { name: /Continue to Payment/ }).click();

    await page.getByText('Pay later', { exact: false }).first().click();
    await expect(page.locator('#cardNumber')).toHaveCount(0);
    await page.getByRole('button', { name: /Place Order/ }).click();

    await expect(page).toHaveURL(/\/shop\/orders\?placed=1&payLater=1/);
    await expect(page.getByText(/payment is due/)).toBeVisible();
    const row = page.locator('tbody tr').filter({ hasText: '$15.00' }).first();
    await expect(row).toContainText('Unpaid');
    await row.getByRole('link', { name: /Pay now/ }).click();

    await expect(page).toHaveURL(/\/shop\/orders\/[0-9a-f-]+\/pay/);
    await fillCard(page, VISA_OK);
    await page.getByRole('button', { name: 'Pay $15.00' }).click();

    await expect(page).toHaveURL(/\/receipt\?paid=1/);
    await expect(page.getByText('Payment successful.')).toBeVisible();
    await expect(page.getByText(`emailed to ${email}`)).toBeVisible();
    await expect(page.getByTestId('receipt-total')).toHaveText('$15.00');
  });
});
