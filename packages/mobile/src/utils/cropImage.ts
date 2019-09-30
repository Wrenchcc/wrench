import * as ImageManipulator from 'react-native-image-manipulator'
import { logError } from 'utils/sentry'

export default async function cropImage({ uri, crop }) {
  try {
    // return ImageManipulator.manipulateAsync(uri, [{ crop }])
    return ImageManipulator.manipulateAsync(uri)
  } catch (err) {
    logError(err, { uri, crop })
  }
}
