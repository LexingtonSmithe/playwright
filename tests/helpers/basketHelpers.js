const { Page, expect } = require('@playwright/test');

export async function validateBasketTotal(page, basket) {
    let checkedBasket = updateBasketExpectedPrice(basket);
    let expectedPrice = checkedBasket.expectedPrice;
    let basketTotal = await getBasketTotal(page);
    
    expect(expectedPrice).toEqual(basketTotal.toFixed(2));

}

export function updateBasketExpectedPrice(basket) {
    let expectedPrice = basket.ticketPrice + basket.ticketBookingFee + basket.extraPrice + basket.extraBookingFee;
    
    if (basket.protectionPlanAdded) {
        
        expectedPrice += basket.protectionPlanPrice;
    }
  
    basket.expectedPrice = expectedPrice.toFixed(2);

    return basket;
  };

export async function getBasketTotal(page) {
    let basketTotalString = await page.locator('[class="basketTotalContainer"]>p').textContent();
    let basketTotalNumber = parseFloat(basketTotalString.replace('£', ''));
    return basketTotalNumber;
}


export async function clickContinue(page) {
    await page.getByTestId('basket-section-continue-btn').click();
}

export async function addToBasket(page) {
    await page.getByTestId('basket-section-add-to-basket-btn').click()
}

export async function validatebasketTimerExists(page) {
    await expect(page.locator('[class="basketTimer"]')).toHaveCount(1);
}

export async function updateBasketPricesWithTickets(page, basket) {
    //Ticket
    let ticketPriceElement = await page.locator('[class*="saleItemCard__price"]').first();
    let ticketPriceText = await ticketPriceElement.textContent(); 
    if (ticketPriceText === null) {
      throw new Error('Price text content is null');
    }
    let ticketPrice = parseFloat(ticketPriceText.replace('£', ''));   
    // Booking Fee
    let ticketBookingFeepriceElement = await page.locator('[class*="saleItemCard__bookingFee"]').first();
    let ticketBookingFeePriceText = await ticketBookingFeepriceElement.textContent(); 
    if (ticketBookingFeePriceText === null) {
      throw new Error('Price text content is null');
    }
    ticketBookingFeePriceText = ticketBookingFeePriceText.replace('+ £', '');
    let ticketBookingFeePrice = parseFloat(ticketBookingFeePriceText.replace('Booking Fee', ''));
    
    basket.ticketPrice = ticketPrice * basket.numberOfTickets;
    basket.ticketBookingFee = ticketBookingFeePrice * basket.numberOfTickets;

    await expect(ticketPrice).toBeGreaterThan(0);
    await expect(ticketBookingFeePrice).toBeGreaterThan(0);

    return basket;
}
export async function updateBasketPricesWithProtectionPlan(page, basket) {
    let protectionPlanPriceElement = await page.getByTestId('activateProtectionPlan-label');
    let protectionPlanPriceText = await protectionPlanPriceElement.textContent(); 
    if (protectionPlanPriceText === null) {
      throw new Error('Price text content is null');
    }
    protectionPlanPriceText = protectionPlanPriceText.replace('Please protect my booking (Total cost  £', '');  
    protectionPlanPriceText = protectionPlanPriceText.replace(').', '');  
    let protectionPlanPrice = parseFloat(protectionPlanPriceText);
    await expect(protectionPlanPrice).toBeGreaterThan(0);
    
    basket.protectionPlanPrice = protectionPlanPrice;
    basket.protectionPlanAdded = true;
    return basket;     
}
