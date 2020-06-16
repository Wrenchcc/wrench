import * as ImageManipulator from 'expo-image-manipulator'
import { logError } from 'utils/sentry'
import { isAndroid } from 'utils/platform'

const MAX_SIZE = 1500

export default async function cropImage({ uri, crop }) {
  try {
    // TODO: Enable cropping again dosen't work in prod
    if (isAndroid) {
      return Promise.resolve({ uri })
    }

    return ImageManipulator.manipulateAsync(uri, [
      { crop },
      {
        resize: {
          width: MAX_SIZE,
          height: MAX_SIZE,
        },
      },
    ])
  } catch (err) {
    logError(err)
  }
}
