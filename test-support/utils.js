var exports = module.exports;

function randomString() {
  let length = 8;
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

exports.generateNewEmail = function () {
  let newEmail = randomString() + 'cypress@kaboodle.co.uk';
  return newEmail;
};

exports.calculateExpectedPrice = function (basket) {
  let expectedPrice = basket.ticketPrice + basket.ticketBookingFee + basket.extraPrice + basket.extraBookingFee;
  
  if (basket.protectionPlanAdded) {
      
      expectedPrice += basket.protectionPlanPrice;
  }

  basket.expectedPrice = expectedPrice

  return basket;
};
