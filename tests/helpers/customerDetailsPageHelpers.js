const { Page, expect } = require('@playwright/test');

export async function registerAsNewCustomer(page, email) {
    await page.getByTestId('customer-email-input-input').fill(email);
}

export async function fillInCustomerDetails(page, email, customer) {
    await page.getByTestId('lead.firstName-input').fill(customer.firstName);
    await page.getByTestId('lead.lastName-input').fill(customer.lastName);
    await page.getByTestId('lead.confirmEmail-input').fill(email);
    await page.getByTestId('lead.password-password-input').fill(customer.password);
    await page.getByTestId('lead.confirmPassword-password-input').fill(customer.password);
    await page.getByTestId('lead.gender-container').locator('select').selectOption(customer.gender);
    await page.getByTestId('lead.phoneNumber-phoneInput-input').fill(customer.phoneNumber);
    await page.getByTestId('lead.dateOfBirth-day-input').fill(customer.dateOfBirth.day);
    await page.getByTestId('lead.dateOfBirth-month-input').fill(customer.dateOfBirth.month);
    await page.getByTestId('lead.dateOfBirth-year-input').fill(customer.dateOfBirth.year);

    await fillInAddress(page, customer);
}

export async function fillInAddress(page, customer) {
    // Click the change address button
    await page.getByTestId('change-address-btn').click();

    // Fill in the address details
    await page.getByTestId('lead.address.line1-input').fill(customer.address.line_1);
    await page.getByTestId('lead.address.city-input').fill(customer.address.city);
    await page.getByTestId('lead.address.postcode-input').fill(customer.address.postcode);

    // Click to open the country dropdown
    await page.getByTestId('lead.address.country-trigger').click();

    // Select the country from the dropdown
    await page.getByTestId('lead.address.country-container').locator('select').selectOption(customer.address.country);

    // Click the change address button again to save
    await page.getByTestId('change-address-btn').click({force: true});
}

export async function addProtectionPlan(page) {
    await page.getByTestId('activateProtectionPlan').click({force : true});
    await expect(page.getByTestId('protection-plan-toggle')).toBeVisible();
}

export async function acceptTermsAndConditions(page) {
    await page.getByTestId('termsConditions').click();
}
