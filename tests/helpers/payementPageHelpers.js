const { Page, expect } = require('@playwright/test');


export async function fillInStripeCardDetails(page, customer) {

    const stripeFrame = page.frameLocator('iframe').first();
    await stripeFrame.locator('[placeholder="1234 1234 1234 1234"]').fill(customer.cardDetails.cardNumber.visaCard);
    await stripeFrame.locator('[placeholder="MM / YY"]').fill('04/30');
    await stripeFrame.locator('[placeholder="CVC"]').fill('242');
    await stripeFrame.locator('[placeholder="WS11 1DB"]').fill(customer.address.postcode);
    await stripeFrame.locator('[data-testid=payment-button]').click(); // TODO: Fix this 

}