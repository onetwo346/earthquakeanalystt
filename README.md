# Earthquake Analyst Premium

An enhanced real-time earthquake and natural disaster monitoring application with premium features and Stripe subscription integration.

## Features

### Free Features
- Real-time earthquake data visualization
- Interactive seismic activity map
- AI-powered insights and analysis
- Visualization of dangerous earthquakes
- Historical statistics

### Premium Features ($2 for 3 months)
- Access to all types of natural disasters (earthquakes, tsunamis, volcanoes, hurricanes, wildfires)
- Global disaster coverage
- Advanced AI predictions and analysis
- 3-month subscription via Stripe
- Welcome email confirmation

## Setup Instructions

1. Make sure you have Node.js installed (v14+ recommended)

2. Install dependencies:
   - For Windows: Run `install.bat`
   - For macOS/Linux: Run `./install.sh` (You may need to make it executable with `chmod +x install.sh` first)
   - Manual installation: Run `npm install express body-parser stripe nodemailer`

3. Configure Stripe and Email:
   - Sign up for a Stripe account at https://stripe.com
   - Get your API keys from the Stripe Dashboard
   - Replace the placeholder Stripe keys in `server.js` with your actual keys:
     - Update `YOUR_STRIPE_SECRET_KEY` with your Stripe Secret Key
     - Update `YOUR_STRIPE_PRICE_ID` with your Stripe Price ID for the 3-month subscription
   - Configure email settings in `mail.js`:
     - Update `YOUR_EMAIL@gmail.com` with your Gmail address
     - Update `YOUR_EMAIL_PASSWORD` with your Gmail password or app password
     - The email will appear to be sent from no-reply@earthquakeanalyst.space
     - For Gmail, you may need to enable "Less secure app access" or create an App Password

4. Start the server:
   - For Windows: Run `start.bat`
   - For macOS/Linux: Run `./start.sh`
   - Manual start: Run `node server.js`

5. Access the application:
   - Open your browser and go to `http://localhost:3000`

## Project Structure

- `index.html` - Landing page
- `main.html` - Main application (free tier)
- `login.html` - Login and signup page with Stripe integration
- `premium.html` - Premium dashboard (requires login and subscription)
- `payment-success.html` - Payment confirmation page after Stripe checkout
- `server.js` - Express server with Stripe API and email integration
- `mail.js` - Email utility with templates for welcome, notification, and subscription emails
- `install.bat` / `install.sh` - Installation scripts for Windows and Unix systems
- `start.bat` / `start.sh` - Server startup scripts for Windows and Unix systems

## Admin Access

For testing and development purposes, you can use the admin login credentials:

- Username: `admin` or `cosmoscoderr`
- Password: `guru`

The admin account has full access to all premium features and additional admin tools, including:
- Adding new disaster data
- Managing users
- Viewing analytics
- Bypassing subscription requirements

## Demo Mode

The application includes a demo mode that works without actual Stripe configuration:

1. Regular user signup is simulated to work without actual payment processing
2. Subscriptions are automatically marked as active for 3 months
3. Welcome emails are logged to the console instead of being sent
4. Actual Stripe code and email sending are commented out but ready for production use

To enable real Stripe processing and email:
1. Replace the placeholder Stripe keys and email credentials in `server.js`
2. Uncomment the Stripe integration code in both `server.js` and `login.html`
3. Uncomment the email sending code in `server.js`

## Email Confirmation

When users sign up and become premium subscribers, they automatically receive:

1. **Welcome Email**: Sent immediately after successful payment
   - Personalized greeting with their name
   - Overview of premium features and benefits
   - Getting started guide
   - Link to access the premium dashboard
   - Support contact information

2. **Subscription Confirmation Email**: Sent alongside the welcome email
   - Detailed subscription information
   - Start and expiry dates
   - Plan details
   - Account information
   - Premium benefits summary

3. **Notification Emails** (when relevant):
   - Emergency alerts for natural disasters
   - Personalized based on user preferences
   - Detailed event information with severity indicators
   - Links to view more information in the premium dashboard

The email system is powered by the `mail.js` utility which provides:
- Beautifully designed HTML email templates with consistent branding
- Different email types for different purposes (welcome, subscription, notification)
- Centralized email configuration for easy maintenance
- Demo mode that logs emails to console instead of sending them

To customize email templates, simply edit the template functions in `mail.js`.

In demo mode, email content is logged to the console instead of actually being sent. For production use, uncomment the email sending code and configure your SMTP settings.

## Stripe Integration

This application uses Stripe for payment processing and subscription management:

1. Users fill out the signup form on the login page
2. Users are redirected to Stripe hosted checkout page (https://buy.stripe.com/fZe3eYf851qk8Cc28a)
3. After successful payment ($2 for 3 months), users are redirected to the payment success page
4. Welcome email is sent to the user's email address
5. Subscription status is confirmed and stored in the application
6. Premium content is only accessible to users with active subscriptions

### Stripe Checkout Configuration

The application is configured to use Stripe Checkout hosted payment page, which provides:
- Secure, PCI-compliant payment processing
- Mobile-friendly checkout experience
- Support for multiple payment methods
- Automatic email receipts from Stripe

To customize the Stripe checkout experience:
1. Log in to your Stripe Dashboard
2. Go to Products > Checkout settings
3. Modify the checkout page appearance, success URL, etc.
4. Update the `STRIPE_CHECKOUT_URL` in `server.js` if needed

For production use, you should:
1. Set up proper webhook handling to verify payments
2. Uncomment the payment verification code in `server.js`
3. Configure your Stripe checkout success URL to point to your domain's `/payment-success` page

## Development Notes

- Replace the placeholder Stripe keys and email credentials before production use
- Configure email settings in `mail.js`:
  - Update `YOUR_EMAIL@gmail.com` with your Gmail address
  - Update `YOUR_EMAIL_PASSWORD` with your Gmail password or app password
- This is a demonstration project; in a production environment, you should implement:
  - Secure authentication system
  - Server-side verification of premium access
  - Database for user management
  - HTTPS for secure communication
  - More sophisticated email template system

## Admin Features

The application includes an admin panel with the following capabilities:

- User Management: View and manage all registered users
- Analytics: Access dashboard statistics and usage data
- Emergency Notifications: Send alert emails to premium users
- Disaster Management: Add or modify disaster data in the system

### Emergency Notification System

Administrators can send emergency notifications to premium users from the admin panel:

1. Access the admin panel by logging in with admin credentials
2. Click on "Send Notification" button
3. Complete the notification form:
   - Event title, type, location and description
   - Event status (Warning, Watch, Advisory, or Information)
   - Select which users should receive the notification
4. Send the notification, which will be delivered via email

The notification emails include:
- Event details and location
- Status and severity information
- Description of the event
- Link to view more details in the premium dashboard

This feature is particularly useful for immediate communication about developing situations and emergency alerts.

## License

This project is licensed under the MIT License. 