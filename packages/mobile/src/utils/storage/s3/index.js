// import * as ImageManipulator from 'expo-image-manipulator'
import { ImageEditor, ImageStore } from 'react-native'
import { client } from 'graphql-old/createClient'
import { PreSignUrlsMutation } from 'graphql-old/mutations/upload/preSignUrls'
import { logError } from 'utils/sentry'
import { pathOr } from 'ramda'
import makeS3Request from './makeS3Request'

const cropImage = async ({ uri, crop }) => new Promise((resolve, reject) => {
  ImageEditor.cropImage(
    uri,
    {
      offset: {
        x: pathOr(0, ['originX'], crop),
        y: pathOr(0, ['originY'], crop),
      },
      size: {
        width: pathOr(0, ['width'], crop),
        height: pathOr(0, ['height'], crop),
      },
      resizeMode: 'contain',
    },
    uri => resolve(uri),
    err => reject(err)
  )
})

// async function cropImage({ uri, crop }) {
//   try {
//     return ImageManipulator.manipulateAsync(uri, [{ crop }])
//   } catch (err) {
//     logError(err, { uri, crop })
//   }
//
//   return null
// }

export const uploadFiles = async files => {
  try {
    const input = files.map(() => ({ type: 'IMAGE' }))
    // Return pre-signed urls
    // Resize images and return uris
    const [preSignedUrls, resizedImages] = await Promise.all([
      client.mutate({ mutation: PreSignUrlsMutation, variables: { input } }),
      Promise.all(files.map(cropImage)),
    ]).catch(err => {
      logError(err)
    })

    // Return filenames
    const result = await Promise.all(
      resizedImages.map(async (uri, index) => {
        const { url, type, filename } = preSignedUrls.data.preSignUrls[index]
        try {
          const uploaded = await makeS3Request(url, { uri, type, filename })
          ImageStore.removeImageForTag(url)

          return uploaded
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
