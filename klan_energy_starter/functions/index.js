const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

const PAYSTACK_SECRET = functions.config().paystack ? functions.config().paystack.secret : null;

exports.initializePayment = functions.https.onCall(async (data, context) => {
  const { amount, email, orderId } = data;
  if (!PAYSTACK_SECRET) throw new functions.https.HttpsError('failed-precondition', 'Paystack secret not set in functions config.');
  try {
    const res = await axios.post('https://api.paystack.co/transaction/initialize', {
      amount: Math.round(amount * 100),
      email,
      metadata: { orderId }
    }, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` }
    });
    return res.data;
  } catch (err) {
    throw new functions.https.HttpsError('unknown', err.message);
  }
});
