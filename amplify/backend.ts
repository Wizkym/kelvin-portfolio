import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { HttpApi, HttpMethod, CorsHttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { sendContact } from './functions/send-contact/resource';

const backend = defineBackend({ sendContact });

// Custom stack for the HTTP API
const apiStack = backend.createStack('ContactApiStack');

const httpApi = new HttpApi(apiStack, 'ContactApi', {
  corsPreflight: {
    allowOrigins: ['https://thek2mundy.com', 'http://localhost:4200'],
    allowMethods: [CorsHttpMethod.POST, CorsHttpMethod.OPTIONS],
    allowHeaders: ['Content-Type'],
  },
});

httpApi.addRoutes({
  path: '/send',
  methods: [HttpMethod.POST],
  integration: new HttpLambdaIntegration(
    'SendContactIntegration',
    backend.sendContact.resources.lambda
  ),
});

// Grant the Lambda permission to send emails via SES
backend.sendContact.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ['ses:SendEmail'],
    resources: ['*'],
  })
);

// Write the API URL into amplify_outputs.json so the Angular app can read it
backend.addOutput({
  custom: {
    contactApiUrl: `${httpApi.url}send`,
  },
});
