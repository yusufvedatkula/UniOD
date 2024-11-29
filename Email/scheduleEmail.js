import schedule from 'node-schedule';
import pkg from 'nodemailer';

import {transporter } from './email.ts'

export const scheduleEmail = (openDayDate, emailDetails) => {
  const scheduledDate = new Date(openDayDate);
  scheduledDate.setDate(scheduledDate.getDate() - 1); // Subtract one day

  scheduledDate.setHours(17, 14, 0)

  // Use the `scheduleJob` method to schedule the job
  schedule.scheduleJob(scheduledDate, async () => {
    try {
      async function sendEmail(mailOptions) {
        return await transporter.sendMail(mailOptions);
      }
      await sendEmail(emailDetails)

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error.message);
    }
  });

  console.log(`Email scheduled for ${scheduledDate}`);
};
