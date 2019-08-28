import { preSignUrls } from 'gql'
import { logError } from 'utils/sentry'
import { FILE_TYPES } from 'utils/enums'
import request from './request'

export default async files => {
  try {
    const input = files.map(() => ({ type: FILE_TYPES.IMAGE }))

    // Return pre-signed urls
    const preSignedUrls = await preSignUrls(input)

    // Return filenames
    const result = await Promise.all(
      files.map(async (uri, i) => {
        const { url, type, filename } = preSignedUrls.data.preSignUrls[i]
        try {
          return request(url, { uri, type, filename })
        } catch (err) {
          logError(err)
        }

        return null
      })
    ).catch(err => {
      logError(err)
    })

    return result
  } catch (err) {
    logError(err)
  }

  return null
}
