import type { APIGatewayEvent, Context } from 'aws-lambda'
import { format } from 'date-fns'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info(`${event.httpMethod} ${event.path}: collectWord function`)

  const requestedDate = format(new Date(), 'yyyy-MM-dd')
  const url = `https://www.nytimes.com/svc/wordle/v2/${requestedDate}.json`

  const response = (await fetch(url).then((res) => res.json())) as {
    id: number
    solution: string
    print_date: string
    days_since_launch: number
    editor: string
  }

  if (requestedDate !== response.print_date) {
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: `No wordle found for ${requestedDate}`,
      }),
    }
  }

  const word = await db.solution.upsert({
    where: { id: response.id },
    create: {
      id: response.id,
      word: response.solution,
      date: response.print_date,
    },
    update: {
      word: response.solution,
      date: response.print_date,
    },
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word, response }),
  }
}
