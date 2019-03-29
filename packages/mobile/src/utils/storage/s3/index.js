import * as ImageManipulator from 'expo-image-manipulator'
import { client } from 'graphql/createClient'
import { PreSignUrlsMutation } from 'graphql/mutations/upload/preSignUrls'
import makeS3Request from './makeS3Request'

async function cropImage({ uri, crop }) {
  return ImageManipulator.manipulateAsync(uri, [{ crop }])
}

export const uploadFiles = async files => {
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
}
