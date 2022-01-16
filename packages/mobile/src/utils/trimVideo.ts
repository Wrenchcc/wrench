import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native'
import { isAndroid } from 'utils/platform'
import * as MediaLibrary from 'expo-media-library'
import { MainBundlePath, CachesDirectoryPath, unlink } from 'react-native-fs'
import { logError } from 'utils/sentry'

const MAX_DURATION = 60

const deleteFile = async (filepath) => {
  return unlink(filepath).catch((_) => _)
}

const assetPath = (filename) => {
  if (isAndroid) {
    return `${CachesDirectoryPath}/${filename}`
  } else {
    return `${MainBundlePath}/${filename}`
  }
}

export default async function trimVideo(asset) {
  const video = await MediaLibrary.getAssetInfoAsync(asset)

  try {
    const outputFile = assetPath(asset.filename)

    await deleteFile(outputFile)

    const command = `-i ${video.localUri} -ss 00:00:00 -to 00:00:${MAX_DURATION} -preset ultrafast -c:v copy -c:a copy ${outputFile}`

    await FFmpegKit.executeAsync(command, async (session) => {
      const returnCode = await session.getReturnCode()

      if (ReturnCode.isSuccess(returnCode)) {
        return outputFile
      }
    })

    return outputFile
  } catch (err) {
    logError(err)
  }
}
