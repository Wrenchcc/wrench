import * as ImageManipulator from 'expo-image-manipulator'
import { logError } from 'utils/sentry'

const MAX_SIZE = 1500

export default async function cropImage({ uri, crop }) {
  try {
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
    logError(err, { uri, crop })
  }
}
