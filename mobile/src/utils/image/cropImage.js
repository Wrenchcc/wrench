import { ImageEditor } from 'react-native'

const DEFAULT_SIZE = 1048

// TODO: Fix scaling
export default async uri => new Promise((resolve, reject) => {
  ImageEditor.cropImage(
    uri,
    {
      offset: { x: 0, y: 0 },
      size: {
        width: DEFAULT_SIZE,
        height: DEFAULT_SIZE,
      },
      displaySize: {
        width: DEFAULT_SIZE,
        height: DEFAULT_SIZE,
      },
      resizeMode: 'contain',
    },
    uri => resolve(uri),
    err => reject(err)
  )
})
