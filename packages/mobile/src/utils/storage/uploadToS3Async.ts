import { preSignUrls } from 'gql'
import { logError } from 'utils/sentry'

// TODO: Handle error
export default async function uploadToS3Async(files) {
  try {
    const mappedFiles = files.flatMap((file) => {
      // NOTE: If video we need to generate a image url for the poster
      // Order matters
      if (file.type === 'VIDEO') {
        return [{ type: 'VIDEO' }, { type: 'IMAGE' }]
      }
      if (file.type === 'IMAGE') {
        return { type: 'IMAGE' }
      }
    })

    const urlTypes = mappedFiles.map(({ type }) => ({ type }))

    const urls = await preSignUrls(urlTypes)

    return Promise.all(
      files.map(async (file, i) => {
        const currentSignedRequest = urls.data.preSignUrls[i]

        if (currentSignedRequest.type === 'mp4') {
          const nextSignedRquest = urls.data.preSignUrls[i + 1]

          await Promise.all([
            fetch(currentSignedRequest.url, {
              // @ts-ignore
              body: { uri: file.uri },
              method: 'PUT',
            }),
            fetch(nextSignedRquest.url, {
              // @ts-ignore
              body: { uri: file.poster },
              method: 'PUT',
            }),
          ])

          return {
            filename: currentSignedRequest.filename,
            poster: nextSignedRquest.filename,
          }
        }

        return {
          filename: currentSignedRequest.filename,
        }
      })
    )
  } catch (err) {
    logError(err)
  }
}
