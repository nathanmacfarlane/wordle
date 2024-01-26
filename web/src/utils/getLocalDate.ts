import { addMinutes, format } from 'date-fns'

export const getLocalDate = (date: Date = new Date()) => {
  const utcNow = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )
  return addMinutes(utcNow, -date.getTimezoneOffset())
}

export const getLocalDateIsoString = (date: Date = new Date()) => {
  const localDate = getLocalDate(date)
  return format(localDate, 'yyyy-MM-dd')
}
