import { preSignUrls } from 'gql'
import { logError } from 'utils/sentry'

// TODO: Handle error
export default async function uploadToS3Async(files) {
  try {
    const mappedFiles = files.flatMap((file, index) => {
      const { uri, poster, type } = file

      // NOTE: If video we need to generate a image url for the poster
      // Order matters
      if (type === 'VIDEO') {
        return [
          { uri, poster, type: 'VIDEO', order: index },
          { uri: poster, type: 'IMAGE', order: index },
        ]
      }
      if (type === 'IMAGE') {
        return { uri, type: 'IMAGE', order: index }
      }
    })

    const urlTypes = mappedFiles.map(({ type }) => ({ type }))
    const urls = await preSignUrls(urlTypes)

    const results = await Promise.all(
      mappedFiles.map(async (file, i) => {
        const currentSignedRequest = urls.data.preSignUrls[i]
        const previousSignedRequest = urls.data.preSignUrls[i - 1]

        // NOTE: Video
        if (currentSignedRequest?.type === 'mp4') {
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

        // NOTE: Image
        if (currentSignedRequest?.type === 'jpg' && previousSignedRequest?.type !== 'mp4') {
          // NOTE: Image
          await fetch(currentSignedRequest.url, {
            // @ts-ignore
            body: { uri: file.uri },
            method: 'PUT',
          })

          return {
            filename: currentSignedRequest.filename,
          }
        }
      })
    )

    return results.filter(Boolean)
  } catch (err) {
    logError(err)
  }
}
