import * as ImageManipulator from 'react-native-image-manipulator'
import { preSignUrls } from 'gql'
import { logError } from 'utils/sentry'
import { FILE_TYPES } from 'utils/enums'
import request from './request'
import { isAndroid } from 'utils/platform'

async function cropImage({ uri, crop }) {
  try {
    if (isAndroid) {
      // Skip crop for now
      // File get isTrusted false
      return Promise.resolve(uri)
    }
    return ImageManipulator.manipulateAsync(uri, [{ crop }])
  } catch (err) {
    logError(err, { uri, crop })
  }

  return null
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
      resizedImages.map(async (uri, i) => {
        const { url, type, filename } = preSignedUrls.data.preSignUrls[i]
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
