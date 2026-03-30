import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

const ses = new SESClient({});

const RECIPIENT_EMAIL = process.env['RECIPIENT_EMAIL']!;
const SENDER_EMAIL    = process.env['SENDER_EMAIL']!;

const corsHeaders = {
  'Access-Control-Allow-Origin':  process.env['CORS_ORIGIN'] ?? '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

function respond(statusCode: number, status: 'ok' | 'error'): APIGatewayProxyResultV2 {
  return { statusCode, headers: corsHeaders, body: JSON.stringify({ status }) };
}

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  let body: { name?: string; email?: string; subject?: string; message?: string };

  try {
    body = JSON.parse(event.body ?? '{}');
  } catch {
    return respond(400, 'error');
  }

  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return respond(400, 'error');
  }

  try {
    await ses.send(new SendEmailCommand({
      Source: SENDER_EMAIL,
      Destination: { ToAddresses: [RECIPIENT_EMAIL] },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: `[Portfolio] ${subject}`, Charset: 'UTF-8' },
        Body: {
          Text: {
            Data: `From: ${name} <${email}>\n\n${message}`,
            Charset: 'UTF-8',
          },
        },
      },
    }));

    return respond(200, 'ok');
  } catch (err) {
    console.error('SES error:', err);
    return respond(500, 'error');
  }
}
