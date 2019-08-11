import ImageEditor from '@react-native-community/image-editor'
import { preSignUrls } from 'gql'
import { logError } from 'utils/sentry'
import { pathOr } from 'ramda'
import { FILE_TYPES } from 'utils/enums'
import request from './request'

const cropImage = async ({ uri, crop }) =>
  ImageEditor.cropImage(uri, {
    offset: {
      x: pathOr(0, ['originX'], crop),
      y: pathOr(0, ['originY'], crop),
    },
    resizeMode: 'contain',
    size: {
      height: pathOr(0, ['height'], crop),
      width: pathOr(0, ['width'], crop),
    },
  })

export default async files => {
  try {
    const input = files.map(() => ({ type: FILE_TYPES.IMAGE }))
    // Return pre-signed urls
    // Resize images and return uris
    const [preSignedUrls, resizedImages] = await Promise.all([
      preSignUrls(input),
      Promise.all(files.map(cropImage)),
    ]).catch(err => {
      logError(err)
    })

    // Return filenames
    const result = await Promise.all(
      resizedImages.map(async (uri, i) => {
        const { url, type, filename } = preSignedUrls.data.preSignUrls[i]
        try {
          // TODO: Remove image from cache
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
