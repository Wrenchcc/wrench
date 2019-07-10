import * as ImageManipulator from 'expo-image-manipulator'
import { preSignUrls } from 'gql'
import { logError } from 'utils/sentry'
import { pathOr } from 'ramda'
import { FILE_TYPES } from 'utils/enums'
import request from './request'

async function cropImage({ uri, crop }) {
  return ImageManipulator.manipulateAsync(uri)
}

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
      resizedImages.map(async (uri, index) => {
        const { url, type, filename } = preSignedUrls.data.preSignUrls[index]
        try {
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
