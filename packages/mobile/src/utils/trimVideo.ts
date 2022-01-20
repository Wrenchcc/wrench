import * as MediaLibrary from 'expo-media-library'
import { Video } from 'react-native-compressor'
import { logError } from 'utils/sentry'

export default async function trimVideo(asset) {
  const video = await MediaLibrary.getAssetInfoAsync(asset)

  try {
    const result = await Video.compress(video.localUri, {
      compressionMethod: 'auto',
    })

    return result
  } catch (err) {
    logError(err)
  }
}
