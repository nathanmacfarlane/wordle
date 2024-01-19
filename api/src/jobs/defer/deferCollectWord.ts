import { format } from 'date-fns'

import { defer } from 'src/jobs/clients/defer'
import { db } from 'src/lib/db'

const deferCollectWord = async () => {
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
    throw new Error(
      `Requested date ${requestedDate} does not match response date ${response.print_date}`
    )
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

  return { word, response }
}

export default defer(deferCollectWord, {
  // retry: 5,
  // concurrency: 10,
  // maxDuration: 5 * 60 // in seconds
})
