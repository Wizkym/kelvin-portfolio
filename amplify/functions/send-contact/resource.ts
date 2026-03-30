import { defineFunction } from '@aws-amplify/backend';

export const sendContact = defineFunction({
  name: 'send-contact',
  environment: {
    RECIPIENT_EMAIL: 'kevkmundy@gmail.com',
    // SENDER_EMAIL must be a SES-verified identity — set before deploying
    SENDER_EMAIL: 'no-reply@thek2mundy.com',
  },
});
