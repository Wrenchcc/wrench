import { cropImage, clearImagesFromStore } from 'utils/image'
import { client } from 'graphql/createClient'
import { preSignUrlsMutation } from 'graphql/mutations/upload/preSignUrls'
import { runSequentially } from 'utils/Promise'
import makeS3Request from './makeS3Request'

// TODO: Figure out what data should be sent, new photos has only uri:s
export const upload = async files => {
  const uris = Object.keys(files)
  const filenames = uris.map(uri => ({ filename: files[uri].filename }))

  // Return pre-signed urls
  // Resize images and return uri:s from ImageStore
  const [preSignedUrls, resizedImages] = await Promise.all([
    client.mutate({ mutation: preSignUrlsMutation, variables: { input: filenames } }),
    runSequentially(uris.map(uri => () => cropImage(uri))),
  ])

  // Return filenames
  const result = await Promise.all(
    resizedImages.map(async (uri, index) => {
      const { url, type, filename } = preSignedUrls.data.preSignUrls[index]
      return makeS3Request(url, { uri, type, filename })
    })
  )

  // Remove images from ImageStore
  clearImagesFromStore(resizedImages)

  return result
}
