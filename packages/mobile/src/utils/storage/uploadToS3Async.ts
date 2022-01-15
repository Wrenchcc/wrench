import { preSignUrls } from 'gql'
import { logError } from 'utils/sentry'

export default async function uploadToS3Async(files) {
  try {
    const input = files.map(({ type }) => ({ type }))
    const urls = await preSignUrls(input)

    return Promise.all(
      files.map(async (uri, i) => {
        const { url, filename } = urls.data.preSignUrls[i]

        await fetch(url, {
          body: uri,
          method: 'PUT',
        })

        return {
          filename,
        }
      })
    )
  } catch (err) {
    logError(err)
  }
}
