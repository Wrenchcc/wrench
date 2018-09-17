import { ImageEditor } from 'react-native'

const DEFAULT_SIZE = 2048

export default async files => Promise.all(
  files.map(
    async ({ uri, width = DEFAULT_SIZE, height = DEFAULT_SIZE }) => new Promise(resolve => {
      ImageEditor.cropImage(
        uri,
        {
          offset: { x: 0, y: 0 },
          size: { width, height },
          resizeMode: 'contain',
        },
        uri => resolve(uri)
      )
    })
  )
)

// TODO: Remove image from store when uploaded ImageStore.removeImageForTag()
// Delete an image from the ImageStore. Images are stored in memory
// and must be manually removed when you are finished with them, otherwise
// they will continue to use up RAM until the app is terminated.
