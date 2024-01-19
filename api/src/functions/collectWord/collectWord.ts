import type { APIGatewayEvent, Context } from 'aws-lambda'

import deferCollectWord from 'src/jobs/defer/deferCollectWord'
import { logger } from 'src/lib/logger'

export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info(`${event.httpMethod} ${event.path}: collectWord function`)

  await deferCollectWord()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: 'Word collected' }),
  }
}
