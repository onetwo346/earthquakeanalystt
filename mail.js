const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL@gmail.com', // Replace with your email
    pass: 'YOUR_EMAIL_PASSWORD'    // Replace with your email password or app password
  },
  from: 'Earthquake Analyst <no-reply@earthquakeanalyst.space>' // Set the from address with your domain
});

// Email templates
const templates = {
  welcome: (name, email) => ({
    from: 'Earthquake Analyst <no-reply@earthquakeanalyst.space>',
    to: email,
    subject: 'Welcome to Earthquake Analyst Premium!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a3d; color: #d9e4ff; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #00c6ff;">Welcome to Earthquake Analyst Premium!</h1>
        </div>
        
        <p>Hello ${name},</p>
        
        <p>Thank you for subscribing to <strong>Earthquake Analyst Premium</strong>! We're excited to have you join our community of safety-conscious users.</p>
        
        <div style="background-color: rgba(0, 198, 255, 0.1); padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; font-weight: bold; color: #00c6ff;">Your $2 premium subscription is now active for 3 months</p>
        </div>
        
        <p>With your premium subscription, you now have access to:</p>
        
        <ul style="background-color: rgba(42, 64, 102, 0.5); padding: 15px; border-radius: 8px;">
          <li><strong>Global Disaster Coverage:</strong> Monitor all types of natural events worldwide</li>
          <li><strong>Advanced AI Analysis:</strong> Get predictive insights and risk assessments</li>
          <li><strong>Real-time Alerts:</strong> Receive immediate notifications about emerging threats</li>
          <li><strong>Historical Data Access:</strong> Explore comprehensive disaster analytics</li>
          <li><strong>Premium Visualizations:</strong> Enhanced map features and data representations</li>
        </ul>
        
        <div style="background-color: rgba(0, 198, 255, 0.1); padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00c6ff;">
          <p style="margin-top: 0;"><strong>Getting Started:</strong></p>
          <ol style="padding-left: 20px; margin-bottom: 0;">
            <li>Log in to your account</li>
            <li>Explore the premium dashboard</li>
            <li>Set up your notification preferences</li>
            <li>Customize your disaster monitoring regions</li>
          </ol>
        </div>
        
        <p>Your subscription is active for 3 months. You can access your premium dashboard at any time by logging in to your account.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://earthquakeanalyst.space/premium.html" style="background: linear-gradient(45deg, #00c6ff, #ff5e62); color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">Access Premium Dashboard</a>
        </div>
        
        <p>If you have any questions or need assistance, feel free to reply to this email or contact our support team at <a href="mailto:support@earthquakeanalyst.space" style="color: #00c6ff;">support@earthquakeanalyst.space</a>.</p>
        
        <p>Stay safe,<br>The Earthquake Analyst Team</p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(0, 198, 255, 0.3); font-size: 12px; color: #b3c7ff;">
          <p>© 2023 Earthquake Analyst. All rights reserved.</p>
          <p>earthquakeanalyst.space</p>
        </div>
      </div>
    `
  }),
  
  notification: (name, email, event) => ({
    from: 'Earthquake Analyst <alerts@earthquakeanalyst.space>',
    to: email,
    subject: `Alert: ${event.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a3d; color: #d9e4ff; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #ff5e62;">Earthquake Analyst Alert</h1>
        </div>
        
        <p>Hello ${name},</p>
        
        <div style="background-color: rgba(255, 94, 98, 0.2); padding: 20px; border-radius: 10px; border: 1px solid rgba(255, 94, 98, 0.4); margin: 20px 0;">
          <h2 style="color: #ff5e62; margin-top: 0;">${event.title}</h2>
          <p style="margin-bottom: 10px;"><strong>Location:</strong> ${event.location}</p>
          <p style="margin-bottom: 10px;"><strong>Type:</strong> ${event.type}</p>
          <p style="margin-bottom: 10px;"><strong>Date:</strong> ${event.date}</p>
          <p style="margin-bottom: 10px;"><strong>Status:</strong> ${event.status}</p>
          <p>${event.description}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://earthquakeanalyst.space/premium.html" style="background: linear-gradient(45deg, #00c6ff, #ff5e62); color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">View Details</a>
        </div>
        
        <p>Stay safe,<br>The Earthquake Analyst Team</p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(0, 198, 255, 0.3); font-size: 12px; color: #b3c7ff;">
          <p>© 2023 Earthquake Analyst. All rights reserved.</p>
          <p>earthquakeanalyst.space</p>
          <p>You're receiving this alert because you're subscribed to premium notifications. <a href="https://earthquakeanalyst.space/settings.html" style="color: #00c6ff;">Manage notification settings</a></p>
        </div>
      </div>
    `
  }),
  
  subscription: (name, email, expiryDate) => ({
    from: 'Earthquake Analyst <no-reply@earthquakeanalyst.space>',
    to: email,
    subject: 'Your Earthquake Analyst Premium Subscription',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a3d; color: #d9e4ff; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #00c6ff;">Subscription Confirmation</h1>
        </div>
        
        <p>Hello ${name},</p>
        
        <p>This is a confirmation that your <strong>Earthquake Analyst Premium</strong> subscription is now active.</p>
        
        <div style="background-color: rgba(0, 198, 255, 0.1); padding: 20px; border-radius: 10px; border: 1px solid rgba(0, 198, 255, 0.3); margin: 20px 0;">
          <h3 style="color: #00c6ff; margin-top: 0;">Subscription Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid rgba(0, 198, 255, 0.2);"><strong>Status:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid rgba(0, 198, 255, 0.2); text-align: right;"><span style="background-color: rgba(0, 198, 255, 0.2); color: #00c6ff; padding: 3px 8px; border-radius: 4px; font-weight: bold;">Active</span></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid rgba(0, 198, 255, 0.2);"><strong>Plan:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid rgba(0, 198, 255, 0.2); text-align: right;">Premium (3 months)</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid rgba(0, 198, 255, 0.2);"><strong>Price:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid rgba(0, 198, 255, 0.2); text-align: right;">$2.00 USD</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid rgba(0, 198, 255, 0.2);"><strong>Start Date:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid rgba(0, 198, 255, 0.2); text-align: right;">${new Date().toISOString().split('T')[0]}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid rgba(0, 198, 255, 0.2);"><strong>Expiry Date:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid rgba(0, 198, 255, 0.2); text-align: right;">${expiryDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Account Email:</strong></td>
              <td style="padding: 8px 0; text-align: right;">${email}</td>
            </tr>
          </table>
        </div>
        
        <p><strong>Premium Benefits:</strong></p>
        <ul style="background-color: rgba(255, 94, 98, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0;">
          <li>Global coverage of all disaster types</li>
          <li>AI-powered predictions and analysis</li>
          <li>Real-time emergency notifications</li>
          <li>Historical data access and visualization</li>
          <li>Premium support</li>
        </ul>
        
        <p>You can manage your subscription anytime from your account settings.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://earthquakeanalyst.space/premium.html" style="background: linear-gradient(45deg, #00c6ff, #ff5e62); color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">Access Premium Dashboard</a>
        </div>
        
        <p>Thank you for your subscription!</p>
        
        <p>Best regards,<br>The Earthquake Analyst Team</p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(0, 198, 255, 0.3); font-size: 12px; color: #b3c7ff;">
          <p>© 2023 Earthquake Analyst. All rights reserved.</p>
          <p>earthquakeanalyst.space</p>
          <p>Questions about your subscription? Contact <a href="mailto:support@earthquakeanalyst.space" style="color: #00c6ff;">support@earthquakeanalyst.space</a></p>
        </div>
      </div>
    `
  })
};

// Send email helper function
const sendEmail = async (type, data) => {
  try {
    if (!templates[type]) {
      throw new Error(`Email template "${type}" not found`);
    }
    
    const mailOptions = templates[type](...data);
    
    // For demo, just log the email content
    console.log(`Email would be sent to: ${mailOptions.to}`);
    console.log(`Email subject: ${mailOptions.subject}`);
    console.log('Email content preview available in server logs');
    
    /* 
    // Uncomment to actually send emails when SMTP is configured
    await transporter.sendMail(mailOptions);
    */
    
    return { success: true, message: `${type} email sent successfully` };
  } catch (error) {
    console.error(`Error sending ${type} email:`, error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendEmail,
  templates
}; 