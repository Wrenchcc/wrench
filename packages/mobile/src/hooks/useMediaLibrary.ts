import { useState } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { logError } from 'utils/sentry'

const initialState = {
  data: [],
  endCursor: null,
  hasNextPage: true,
  // isLoading: true,
}

const defaultConfig = {
  first: 30,
}

export default function() {
  const [assets, setAssets] = useState(initialState)

  async function getAssets(config = defaultConfig) {
    try {
      const assets = await CameraRoll.getPhotos(config)
      setAssets(assets)
    } catch (err) {
      logError('error: ', err)
    }
  }

  return [assets, getAssets]
}
