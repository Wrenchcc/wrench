import * as MediaLibrary from 'expo-media-library'
import { Video } from 'react-native-compressor'
import * as VideoThumbnails from 'expo-video-thumbnails'
import { showToast } from 'navigation/banner'
import { logError } from 'utils/sentry'
import { TOAST_TYPES } from './enums'

const MAX_DURATION = 60

export default async function trimVideo(asset) {
  try {
    const video = await MediaLibrary.getAssetInfoAsync(asset)

    if (video.duration > MAX_DURATION) {
      // TODO: Translate
      showToast({
        type: TOAST_TYPES.ERROR,
        content: `Video to long, max lenght is ${MAX_DURATION}s`,
      })

      return Promise.reject({ message: 'Video to long' })
    }

    const [uri, poster] = await Promise.all([
      Video.compress(video.localUri, {
        compressionMethod: 'auto',
      }),
      VideoThumbnails.getThumbnailAsync(video.localUri),
    ])

    return {
      uri,
      poster: poster.uri,
    }
  } catch (err) {
    logError(err)
  }
}
