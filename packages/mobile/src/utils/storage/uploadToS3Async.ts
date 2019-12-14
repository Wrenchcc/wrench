import { preSignUrls } from 'services/gql'
import { logError } from 'utils/sentry'
import { FILE_TYPES } from 'utils/enums'

export default async function uploadToS3Async(files) {
  try {
    const input = files.map(() => ({ type: FILE_TYPES.IMAGE }))
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
