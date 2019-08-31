import { logError } from 'utils/sentry'

export default async function uploadImageAsync(url, file) {
  try {
    await fetch(url, {
      body: file,
      method: 'PUT',
    })

    return {
      filename: file.filename,
    }
  } catch (err) {
    logError(err)
  }
}
