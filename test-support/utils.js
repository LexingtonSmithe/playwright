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


// function getStripeField(fieldSelector, attempts = 0) {
//     if (attempts > 50) throw new Error('too many attempts');
  
//     return cy
//       .get('iframe[name^="__privateStripeFrame"]', { timeout: 10_000, log: false })
//       .eq(0, { log: false })
//       .its('0.contentDocument', { log: false })
//       .find('body', { log: false })
//       .then((body) => {
//         const stripeField = body.find(fieldSelector);
//         if (!stripeField.length) {
//           return cy.wait(3000, { log: false }).then(() => {
//             getStripeField(fieldSelector, ++attempts);
//           });
//         } else {
//           return cy.wrap(stripeField);
//         }
//       })
//       .scrollIntoView();
//   }
  
//   exports.getStripeField = getStripeField;