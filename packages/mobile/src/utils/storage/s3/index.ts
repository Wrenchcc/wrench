import { preSignUrls } from 'gql'
import { logError } from 'utils/sentry'
import { FILE_TYPES } from 'utils/enums'
import request from './request'

export default async files => {
  try {
    const input = files.map(() => ({ type: FILE_TYPES.IMAGE }))
    const { data } = await preSignUrls(input)

    return Promise.all(
      files.map(async (uri, i) => {
        const { url, type, filename } = data.preSignUrls[i]

        return request(url, {
          uri,
          type,
          filename,
        })
      })
    )
  } catch (err) {
    logError(err)
  }
}
