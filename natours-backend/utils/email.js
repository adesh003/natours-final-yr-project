const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Adesh Kumar <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SANDGRID_USERNAME,
          pass: process.env.SANDGRID_PASSWORD
        }
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(template, subject) {
    let html;
    try {
      // 1) Render HTML based on a pug template
      html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
        firstName: this.firstName,
        url: this.url,
        subject
      });
    } catch (err) {
      console.error('💥 Email Template Rendering Failed:', err);
      // Agar template nahi mila toh bhi code na phate, isliye default HTML
      html = `<h1>${subject}</h1><p>Action needed: ${this.url}</p>`;
    }

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }

  // 👇 YE FUNCTION CLASS KE ANDAR HONA CHAHIYE (Ab Sahi Hai)
  async sendBookingConfirm(tourName, price) {
    const subject = `Booking Confirmed: ${tourName} 🎉`;
    
    // Custom HTML sirf is function ke liye
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #55c57a;">Your Adventure Awaits! 🌲</h2>
        <p>Hello ${this.firstName},</p>
        <p>Your booking for <strong>${tourName}</strong> has been confirmed.</p>
        <p><strong>Amount Paid:</strong> $${price}</p>
        <p>Please log in to your account to download your ticket.</p>
        <a href="${this.url}" style="background-color: #55c57a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display:inline-block; margin-top:10px;">View My Bookings</a>
        <hr style="margin-top: 20px;" />
        <p style="font-size: 12px; color: #777;">Natours Inc.</p>
      </div>
    `;

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    await this.newTransport().sendMail(mailOptions);
  }
  
}; 