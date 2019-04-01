import * as ImageManipulator from 'expo-image-manipulator'
import { client } from 'graphql/createClient'
import { PreSignUrlsMutation } from 'graphql/mutations/upload/preSignUrls'
import { logError } from 'utils/sentry'
import makeS3Request from './makeS3Request'

async function cropImage({ uri, crop }) {
  try {
    return ImageManipulator.manipulateAsync(uri, [{ crop }])
  } catch (err) {
    logError(err, { uri, crop })
  }

  return null
}

export const uploadFiles = async files => {
  try {
    const input = files.map(() => ({ type: 'IMAGE' }))
    // Return pre-signed urls
    // Resize images and return uris
    const [preSignedUrls, resizedImages] = await Promise.all([
      client.mutate({ mutation: PreSignUrlsMutation, variables: { input } }),
      Promise.all(files.map(cropImage)),
    ])

    // Return filenames
    const result = await Promise.all(
      resizedImages.map(async (uri, index) => {
        const { url, type, filename } = preSignedUrls.data.preSignUrls[index]
        const uploaded = await makeS3Request(url, { uri, type, filename })

        return uploaded
      })
    )

    return result
  } catch (err) {
    logError(err, { files })
  }

  return null
}
