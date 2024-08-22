const { Page, expect } = require('@playwright/test');



export async function validateDefaultState(page) {
      // ************** assert default state

    await expect(page.getByTestId('basket-section-view-basket-selector-toggleBasket')).toBeDisabled();
    await expect(page.getByTestId('basket-section-continue-btn')).toBeDisabled();
    await expect(page.locator('[class="basketTimer"]')).toHaveCount(0);

}

export async function validateTicketSelection(page) {
    let saleItemCard = page.getByTestId('sale-item-card-0');

    // Default state of the ticket
    let decreaseBtn = saleItemCard.getByTestId('itemSpinner-decreaseBtn');
    let value = saleItemCard.getByTestId('itemSpinner-value');
    let increaseBtn = saleItemCard.getByTestId('itemSpinner-increaseBtn');
    await expect(decreaseBtn).toBeDisabled();
    await expect(value).toHaveText('0');
    
    // State of the itemSpinner after clicking the increase button
    await increaseBtn.click();
    await expect(value).toHaveText('1');
    await expect(decreaseBtn).toBeEnabled();
    
    // State of the itemSpinner after clicking the decrease button
    await decreaseBtn.click();
    await expect(decreaseBtn).toBeDisabled();
    await expect(value).toHaveText('0');

}
