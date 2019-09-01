import * as ImageManipulator from 'react-native-image-manipulator'
import { logError } from 'utils/sentry'
import { isAndroid } from 'utils/platform'

export default async function cropImage({ uri, crop }) {
  try {
    // TODO: Enable cropping again dosen't work in prod
    if (isAndroid) {
      return Promise.resolve({ uri })
    }

    return ImageManipulator.manipulateAsync(uri, [{ crop }])
  } catch (err) {
    logError(err, { uri, crop })
  }
}
