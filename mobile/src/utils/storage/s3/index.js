import { client } from 'graphql/createClient'
import { preSignUrlsMutation } from 'graphql/mutations/upload/preSignUrls'
import { runSequentially } from 'utils/Promise'
import { cropImage } from 'utils/image'
import makeS3Request from './makeS3Request'

export const uploadFiles = async files => {
  const input = files.map(({ filename }) => ({ filename }))

  // Return pre-signed urls
  // Resize images and return uris
  const [preSignedUrls, resizedImages] = await Promise.all([
    client.mutate({ mutation: preSignUrlsMutation, variables: { input } }),
    runSequentially(files.map(uri => () => cropImage(uri))),
  ])

  console.log(resizedImages)

  // Return filenames
  const result = await Promise.all(
    resizedImages.map(async (uri, index) => {
      const { url, type, filename } = preSignedUrls.data.preSignUrls[index]
      return makeS3Request(url, { uri: uri.uri, type, filename })
    })
  )

  return result
}
