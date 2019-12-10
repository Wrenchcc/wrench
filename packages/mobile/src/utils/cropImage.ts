import * as ImageManipulator from '@pontusab/react-native-image-manipulator'
import { logError } from 'utils/sentry'
import { isAndroid } from 'utils/platform'

const MAX_SIZE = 1500

export default async function cropImage({ uri, crop }) {
  try {
    if (isAndroid) {
      // TODO: Enable cropping again dosen't work in prod
      return Promise.resolve({ uri })
    } else {
      return ImageManipulator.manipulateAsync(uri, [
        { crop },
        {
          resize: {
            width: MAX_SIZE,
            height: MAX_SIZE,
          },
        },
      ])
    }
  } catch (err) {
    logError(err, { uri, crop })
  }
}
