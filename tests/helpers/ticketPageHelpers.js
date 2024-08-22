const { Page, expect } = require('@playwright/test');

export async function validateSuccessToastMessage(page) {
    await expect(page.getByTestId('engine-state-basket-success-notification')).toBeVisible();
}

export async function addNumberOfTicketsToBasket(page, numberOfTickets) {
    let saleItemCard = page.getByTestId('sale-item-card-0');
    let increaseBtn = saleItemCard.getByTestId('itemSpinner-increaseBtn');
    for(let i = 0; i < numberOfTickets; i++){
        await increaseBtn.click();
    }
}
