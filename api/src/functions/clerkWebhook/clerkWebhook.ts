import type { UserWebhookEvent } from '@clerk/clerk-sdk-node'
import type { APIGatewayEvent, Context } from 'aws-lambda'

import { db } from 'src/lib/db'
import { handleResponse, parseClerkRequest } from 'src/utils/webhookHelpers'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (req: APIGatewayEvent, _context: Context) => {
  let event: UserWebhookEvent | null = null
  try {
    event = parseClerkRequest(
      req,
      process.env.CLERK_WEBHOOK_SECRET
    ) as UserWebhookEvent
  } catch (error: any) {
    return handleResponse(false, {
      message: error.message || 'Failed to parse Clerk request',
    })
  }

  if (!['user.updated', 'user.created', 'user.deleted'].includes(event.type)) {
    return handleResponse(true, { message: 'Unhandled Event' })
  }

  if (event.type === 'user.deleted') {
    const userId = event.data.id
    const deleted = event.data.deleted

    if (!userId) {
      return handleResponse(false, { message: 'no user id' })
    }

    if (!deleted) {
      return handleResponse(true, { message: 'user not deleted' })
    }

    try {
      await db.user.delete({ where: { id: userId } })
    } catch (error: any) {
      // TODO log this
      return handleResponse(false, {
        message:
          error.message || `Failed to delete user from event: ${event.type}`,
      })
    }

    return handleResponse(true, { message: 'Ok' })
  }

  const primaryEmailId = event.data.primary_email_address_id
  const email = event.data.email_addresses.find(
    (e) => e.id === primaryEmailId
  )?.email_address
  const name = `${event.data.first_name} ${event.data.last_name}`
  const imageUrl = event.data.profile_image_url
  const userId = event.data.id

  if (!email) {
    return handleResponse(false, { message: 'no email' })
  }

  if (event.type === 'user.created') {
    await db.user.upsert({
      where: { email },
      create: {
        name,
        email,
        imageUrl,
      },
      update: {
        name,
        imageUrl,
      },
    })

    return handleResponse(true, { message: 'success' })
  }

  await db.user.update({
    where: { id: userId },
    data: {
      name,
      email,
      imageUrl,
    },
  })

  return handleResponse(true, { message: 'success' })
}
