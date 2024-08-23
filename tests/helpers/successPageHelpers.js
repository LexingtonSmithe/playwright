const { Page, expect } = require('@playwright/test');

export async function validatePaymentSuccess(page) {
    await expect(page.getByText('Thank you for your booking')).toBeVisible()
    await expect(page.getByText('Your payment was successful')).toBeVisible();
}

export async function validateBookingSuccess(page, basket, email ) {
    await expect(page.getByText(email)).toBeVisible()
    await expect(page.getByText('Booking reference: ')).toBeVisible();
    await expect(page.getByText('£'+ basket.expectedPrice)).toBeVisible();
}