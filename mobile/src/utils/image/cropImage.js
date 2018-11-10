import { ImageEditor } from 'react-native'

const DEFAULT_SIZE = 2048

export default async ({ uri, offset }) => new Promise((resolve, reject) => {
  ImageEditor.cropImage(
    uri,
    {
      offset,
      size: {
        width: DEFAULT_SIZE,
        height: DEFAULT_SIZE,
      },
      resizeMode: 'contain',
    },
    uri => resolve(uri),
    err => reject(err)
  )
})
