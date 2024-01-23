import { startOfDay } from 'date-fns'

import { db } from 'src/lib/db'

export const generateUserDate = (timeZone: string) => {
  // Get the current date and time in the specified timezone
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat('en-US', { timeZone }).format(
    currentDate
  )

  // Create a new Date object with the specified timezone
  const dateInSpecificTimezone = new Date(formattedDate)

  return dateInSpecificTimezone
}

export const getCurrentDateForUser = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { timezone: true },
  })

  const date = startOfDay(
    generateUserDate(user?.timezone || 'America/Los_Angeles')
  )

  return date
}
