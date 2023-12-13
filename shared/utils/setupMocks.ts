/* ------- mock data --------- */

const PLANS = ["", "free", "small", "medium", "pro", "enterprise"];
const CARDS = ["", "visa", "amex", "mastercard", "diners", "paypal"];

function goback(hours: number) {
  return Date.now() - hours * 3600 * 1000;
}

export const setupMocks = (entries, type) => {
  entries.forEach((el, i) => {
    const { plan, card } = el;
    el.created = goback(i * 3);
    if (plan) el.plan = PLANS[plan];
    if (card) el.card = CARDS[card];
  });
};
