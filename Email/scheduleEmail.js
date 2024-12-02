import schedule from 'node-schedule';

import {transporter } from './email.ts'

export const scheduleEmail = (openDayDate, emailDetails, time) => {
  const scheduledDate = new Date(openDayDate);
  scheduledDate.setDate(scheduledDate.getDate() - 1); // Subtract one day


  scheduledDate.setHours(time.split(':')[0], time.split(':')[1], 0)

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
