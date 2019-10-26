/**
 * An errors which gets raised when the timeout
 * exceeded
 *
 * @internal
 */
export class TimeoutError extends Error {}

/**
 * Executes a promise in the given timeout. If the promise
 * does not finish in the given timeout, it will
 * raise a TimeoutError
 *
 * @param {number} ms The timeout in milliseconds
 * @param {Promise<any>} promise The promise which should get executed
 *
 * @internal
 */
export default function promiseTimeout(ms: number, promise: Promise<any>): Promise<any> {
  // Create a promise that rejects in <ms> milliseconds
  const timeout = new Promise((_, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id)
      reject(new TimeoutError('Timed out in ' + ms + 'ms.'))
    }, ms)
  })

  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeout])
}
