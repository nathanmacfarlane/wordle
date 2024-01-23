import crypto from 'crypto'

import type { WebhookEvent } from '@clerk/clerk-sdk-node'

export const handleResponse = (isSuccess: boolean, body: object) => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    statusCode: isSuccess ? 200 : 500,
  }
}

export const parseClerkRequest = (req: any, secret?: string) => {
  const svixId = req.headers['svix-id']
  const svixTimestamp = req.headers['svix-timestamp']
  const body = req.body
  const svixSignature = req.headers['svix-signature'].split(',')[1]

  const signedContent = `${svixId}.${svixTimestamp}.${body}`

  if (!secret) {
    throw new Error('Missing webhook secret')
  }

  // Need to base64 decode the secret
  const secretBytes = Buffer.from(secret.split('_')[1], 'base64')
  const signature = crypto
    .createHmac('sha256', secretBytes)
    .update(signedContent)
    .digest('base64')

  if (signature !== svixSignature) {
    throw new Error('Invalid signuature')
  }

  return JSON.parse(req.body) as WebhookEvent
}
