'use server';

import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY!,
});

const sentFrom = new Sender('qrh@danielkappelle.com', 'QRH Flash Cards');

export const sendTokenMail = async (token: string, email: string) => {
  console.log(`Email: ${email}, token: ${token}`);
  if (process.env.NODE_ENV !== 'production') {
    // Override email in dev
    email = process.env.DEV_EMAIL!;
    return;
  }

  const recipients = [new Recipient(email)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject('[QRH Flash Cards] Access Token')
    .setHtml(
      `<p>Hi, you've requested an access token to use the QRH Flash Cards trainer. Find your access token below.</p><p><strong>${token}</strong></p>`
    )
    .setText(
      `Hi, you've requested an access token to use the QRH Flash Cards trainer. Find your access token here: ${token}`
    );

  await mailerSend.email.send(emailParams);
};
