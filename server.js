const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Replace with your Stripe Secret Key

const app = express();
app.use(bodyParser.json());

app.post('/subscribe', async (req, res) => {
  const { email, paymentMethodId } = req.body;

  try {
    // Create a Stripe customer
    const customer = await stripe.customers.create({
      email: email,
      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Subscribe the customer to a plan (in this case, a simple 6-month subscription)
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: 'YOUR_STRIPE_PLAN_ID' }], // Replace with your plan ID for 6-month access at $0.50
      expand: ['latest_invoice.payment_intent'],
    });

    res.json({ subscriptionId: subscription.id, status: subscription.status });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).send({ error: error.message });
  }
});

// Check subscription status
app.post('/check-subscription', async (req, res) => {
  const { email } = req.body;

  try {
    // Fetch customer based on email
    const customers = await stripe.customers.list({ email });
    if (customers.data.length === 0) {
      return res.status(404).send({ error: 'Customer not found' });
    }

    const customer = customers.data[0];
    const subscriptions = await stripe.subscriptions.list({ customer: customer.id });

    if (subscriptions.data.length === 0) {
      return res.status(404).send({ error: 'No active subscriptions' });
    }

    const subscription = subscriptions.data[0];
    res.json({ status: subscription.status });
  } catch (error) {
    console.error('Error checking subscription:', error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
