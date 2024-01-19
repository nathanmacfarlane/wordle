// the defer() helper will be used to define a background function
import { defer } from 'src/jobs/clients/defer'
import { logger } from 'src/lib/logger'

const sleep = (seconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, seconds)
  })

// a background function must be async
const helloWorld = async (name: string) => {
  await sleep(10)
  logger.info(`Hello ${name}!`)
}

// the function must be wrapped with defer() and exported as default
export default defer(helloWorld, {
  // retry: 5,
  // concurrency: 10,
  // maxDuration: 5 * 60 // in seconds
})
