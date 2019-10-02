import { preSignUrls } from 'gql'
import { emit } from 'jetemit'
import { UPLOAD_PROGRESS } from 'utils/storage/constants'
import { logError } from 'utils/sentry'
import { FILE_TYPES } from 'utils/enums'
import uploadAsync from './uploadAsync'

export default async function uploadToS3Async(files) {
  try {
    const input = files.map(() => ({ type: FILE_TYPES.IMAGE }))
    const urls = await preSignUrls(input)

    const progress = []

    return Promise.all(
      files.map(async (uri, i) => {
        const { url, filename, type } = urls.data.preSignUrls[i]

        await uploadAsync(url, { uri, type }, p => {
          progress[i] = p
          const totalProgress = progress.reduce((a, b) => a + b / files.length, 0)
          emit(UPLOAD_PROGRESS, totalProgress === 100 ? 0 : totalProgress)
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
