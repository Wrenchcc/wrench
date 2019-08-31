import { preSignUrls } from 'gql'
import { logError } from 'utils/sentry'
import { FILE_TYPES } from 'utils/enums'
import uploadImageAsync from './uploadImageAsync'

export default async files => {
  try {
    const input = files.map(() => ({ type: FILE_TYPES.IMAGE }))

    const urls = await preSignUrls(input)

    const result = await Promise.all(
      files.map(async (uri, i) => {
        const { url, type, filename } = urls.data.preSignUrls[i]
        return uploadImageAsync(url, { uri, type, filename })
      })
    )

    return result
  } catch (err) {
    logError(err)
  }
}
