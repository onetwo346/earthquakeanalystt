const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Replace with your Stripe Secret Key
const path = require('path');
const { sendEmail } = require('./mail'); // Import email utility

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

// Define the Stripe checkout URL
const STRIPE_CHECKOUT_URL = 'https://buy.stripe.com/fZe3eYf851qk8Cc28a';

// Add endpoint to get checkout URL
app.get('/api/checkout-url', (req, res) => {
  res.json({ url: STRIPE_CHECKOUT_URL });
});

// Handle user signup with email confirmation
app.post('/signup', async (req, res) => {
  const { name, email } = req.body;
  
  try {
    // Send welcome email using our email utility
    const result = await sendEmail('welcome', [name, email]);
    
    res.json({ success: result.success, message: result.message });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    res.status(500).send({ error: error.message });
  }
});

// Handle subscription creation
app.post('/subscribe', async (req, res) => {
  const { email, paymentMethodId, name, checkoutSessionId } = req.body;

  try {
    // For production, verify the checkout session with Stripe
    // This would verify the payment was actually made

    /* 
    // Verify the checkout session (Use this in production)
    let isValidPayment = false;
    if (checkoutSessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
        isValidPayment = session.payment_status === 'paid' && session.customer_email === email;
      } catch (err) {
        console.error('Error verifying checkout session:', err);
      }
    }

    if (!isValidPayment) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid or missing payment. Please complete checkout.'
      });
    }
    */
    
    // For demo purposes, always succeed with a fake subscription
    // This allows the app to work without actual Stripe credentials
    
    // Create expiration date 3 months from now
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 3);
    const expiryDate = expiresAt.toISOString().split('T')[0];
    
    // Send welcome and subscription emails
    let emailSuccess = true;
    let emailError = null;
    
    try {
      // 1. Send welcome email to confirm premium access
      const welcomeResult = await sendEmail('welcome', [name || 'Premium User', email]);
      if (!welcomeResult.success) {
        emailSuccess = false;
        emailError = welcomeResult.error;
        console.error('Failed to send welcome email:', welcomeResult.error);
      }
      
      // 2. Send subscription details email with expiry date
      const subResult = await sendEmail('subscription', [name || 'Premium User', email, expiryDate]);
      if (!subResult.success) {
        emailSuccess = false;
        emailError = subResult.error;
        console.error('Failed to send subscription email:', subResult.error);
      }
      
      console.log(`Emails sent successfully to: ${email}`);
    } catch (emailError) {
      emailSuccess = false;
      console.error('Failed to send emails:', emailError);
      // Continue with subscription even if email fails
    }
    
    res.json({ 
      subscriptionId: 'sub_simulated123456',
      status: 'active',
      customerId: 'cus_simulated123456',
      success: true,
      emailSuccess,
      emailError
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});

// Check subscription status
app.post('/check-subscription', async (req, res) => {
  const { email } = req.body;
  
  // Check for admin credentials
  if (email === 'admin' || email === 'cosmoscoderr') {
    return res.json({
      status: 'active',
      customerId: 'admin',
      expiresAt: '2099-12-31',
      isAdmin: true
    });
  }

  try {
    // For demo purposes, simulate active subscription
    // This allows the app to work without actual Stripe credentials
    
    // Create expiration date 3 months from now
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 3);
    
    res.json({ 
      status: 'active',
      customerId: 'cus_simulated' + Date.now(),
      expiresAt: expiresAt.toISOString().split('T')[0]
    });
    
    /* 
    // Uncomment this section when actual Stripe integration is needed
    
    // Fetch customer based on email
    const customers = await stripe.customers.list({ email });
    if (customers.data.length === 0) {
      return res.status(404).send({ error: 'Customer not found' });
    }

    const customer = customers.data[0];
    const subscriptions = await stripe.subscriptions.list({ 
      customer: customer.id,
      status: 'active'
    });

    if (subscriptions.data.length === 0) {
      return res.status(404).send({ error: 'No active subscriptions' });
    }

    const subscription = subscriptions.data[0];
    
    // Get subscription details including expiration date
    const endDate = new Date(subscription.current_period_end * 1000);
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    res.json({ 
      status: subscription.status,
      customerId: customer.id,
      expiresAt: formattedEndDate
    });
    */
  } catch (error) {
    console.error('Error checking subscription:', error);
    res.status(500).send({ error: error.message });
  }
});

// Admin API endpoint - Get all users
app.get('/api/admin/users', (req, res) => {
  // This would normally validate admin credentials and fetch from a database
  // For demo, return mock data
  res.json([
    { id: 1, name: 'John Smith', email: 'john@example.com', joined: '2023-11-10', status: 'active' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', joined: '2023-11-15', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', joined: '2023-11-20', status: 'expired' },
    { id: 4, name: 'Admin', email: 'admin@earthquakeanalyst.com', joined: '2023-01-01', status: 'admin' }
  ]);
});

// Admin API endpoint - Send notification
app.post('/api/admin/send-notification', async (req, res) => {
  const { userIds, event } = req.body;
  
  if (!userIds || !Array.isArray(userIds) || !event) {
    return res.status(400).json({ success: false, error: 'Invalid request parameters' });
  }
  
  try {
    // This would normally validate admin credentials and fetch from a database
    // For demo, use our mock data
    const users = [
      { id: 1, name: 'John Smith', email: 'john@example.com', joined: '2023-11-10', status: 'active' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', joined: '2023-11-15', status: 'active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', joined: '2023-11-20', status: 'expired' },
      { id: 4, name: 'Admin', email: 'admin@earthquakeanalyst.com', joined: '2023-01-01', status: 'admin' }
    ];
    
    const targetUsers = users.filter(user => userIds.includes(user.id) && user.status === 'active');
    
    if (targetUsers.length === 0) {
      return res.status(404).json({ success: false, error: 'No active users found with the provided IDs' });
    }
    
    // Send notification emails to each target user
    const emailPromises = targetUsers.map(user => 
      sendEmail('notification', [user.name, user.email, event])
    );
    
    await Promise.all(emailPromises);
    
    res.json({
      success: true,
      message: `Notification sent to ${targetUsers.length} users`,
      recipients: targetUsers.map(user => ({ id: user.id, email: user.email }))
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all available disaster types for premium users
app.get('/api/disaster-types', (req, res) => {
  res.json([
    { id: 'earthquake', name: 'Earthquakes', count: 156 },
    { id: 'volcano', name: 'Volcanoes', count: 42 },
    { id: 'tsunami', name: 'Tsunamis', count: 18 },
    { id: 'hurricane', name: 'Hurricanes', count: 28 },
    { id: 'wildfire', name: 'Wildfires', count: 73 },
    { id: 'drought', name: 'Droughts', count: 31 },
    { id: 'flood', name: 'Floods', count: 84 }
  ]);
});

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/premium', (req, res) => {
  res.sendFile(path.join(__dirname, 'premium.html'));
});

app.get('/payment-success', (req, res) => {
  res.sendFile(path.join(__dirname, 'payment-success.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});