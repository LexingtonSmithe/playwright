// @ts-check
import { validateDefaultState, validateTicketSelection } from '../tests/helpers/initialisationHelpers';
import { validateSuccessToastMessage, addNumberOfTicketsToBasket } from '../tests/helpers/ticketPageHelpers';
import { validateBasketTotal, clickContinue, addToBasket, validatebasketTimerExists, updateBasketPricesWithTickets, updateBasketPricesWithProtectionPlan, updateBasketExpectedPrice } from '../tests/helpers/basketHelpers';
import { registerAsNewCustomer, fillInCustomerDetails, addProtectionPlan, acceptTermsAndConditions } from '../tests/helpers/customerDetailsPageHelpers';
import { fillInStripeCardDetails } from '../tests/helpers/payementPageHelpers';
import { validatePaymentSuccess, validateBookingSuccess } from './helpers/successPageHelpers.js';


const { test, expect } = require('@playwright/test');
const utils = require('../test-support/utils');
const customer = require('../test-data/customer.json');

test('Complete A Booking As A New Customer', async ({ page }) => {
  let newCustomerEmail = utils.generateNewEmail();
  let basket = {
    extraPrice: 0,
    extraBookingFee: 0,
    ticketPrice: 0,
    ticketBookingFee: 0,
    protectionPrice: 0,
    protectionPlanAdded: false,
    numberOfTickets : 2,
    expectedPrice: 0,
  };

  let initToken = "FILL_ME_IN"

  await page.goto('/' + initToken);
  await page.waitForTimeout(5000);
  await validateDefaultState(page);
  await validateTicketSelection(page)
  await addNumberOfTicketsToBasket(page, basket.numberOfTickets);
  basket = await updateBasketPricesWithTickets(page, basket);
  await addToBasket(page);
  await validateSuccessToastMessage(page);
  await validatebasketTimerExists(page);
  await validateBasketTotal(page, basket);
  await clickContinue(page);
  // Current package doesn't contain extras, that step would go here
  await registerAsNewCustomer(page, newCustomerEmail);
  await clickContinue(page);
  await fillInCustomerDetails(page, newCustomerEmail, customer);
  await validateBasketTotal(page, basket);
  await addProtectionPlan(page);
  basket = await updateBasketPricesWithProtectionPlan(page, basket);
  await validateBasketTotal(page, basket);
  await acceptTermsAndConditions(page);
  await clickContinue(page);
  await validateBasketTotal(page, basket);
  await page.waitForTimeout(5000);
  await fillInStripeCardDetails(page, customer);
  await validatePaymentSuccess(page); 
  basket = updateBasketExpectedPrice(basket);
  await validateBookingSuccess(page, basket, newCustomerEmail);

});

