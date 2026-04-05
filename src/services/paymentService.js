const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
class PaymentService {
  static async process(data) {
    const intent = await stripe.paymentIntents.create({
      amount: data.amount, currency: data.currency || 'usd',
      payment_method: data.payment_method, confirm: true
    });
    return { id: intent.id, status: intent.status };
  }
  static async refund(data) {
    const refund = await stripe.refunds.create({ payment_intent: data.payment_intent_id });
    return { id: refund.id, status: refund.status };
  }
}
module.exports = PaymentService;
