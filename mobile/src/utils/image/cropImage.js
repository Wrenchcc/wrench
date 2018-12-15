import { ImageEditor } from 'react-native'

export default async ({ uri, crop }) => new Promise((resolve, reject) => {
  ImageEditor.cropImage(
    uri,
    {
      // offset: crop.offset,
      // size: crop.size,
      resizeMode: 'contain',
    },
    uri => resolve(uri),
    err => reject(err)
  )
})
