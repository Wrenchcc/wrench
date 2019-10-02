import { preSignUrls } from 'gql'
import { logError } from 'utils/sentry'
import { FILE_TYPES } from 'utils/enums'
import uploadAsync from './uploadAsync'

export default async function uploadToS3Async(files) {
  try {
    const input = files.map(() => ({ type: FILE_TYPES.IMAGE }))
    const urls = await preSignUrls(input)

    return Promise.all(
      files.map(async (uri, i) => {
        const { url, filename, type } = urls.data.preSignUrls[i]

        await uploadAsync(url, { uri, type }, true)

        return {
          filename,
        }
      })
    )
  } catch (err) {
    logError(err)
  }
}
