import ImageResizer from 'react-native-image-resizerreact-native'

const DEFAULT_SIZE = 2048
const COMPRESS_FORMAT = 'JPEG'
const QUALITY = 80

// TODO: Fix scaling
export default async uri => ImageResizer.createResizedImage(uri, DEFAULT_SIZE, DEFAULT_SIZE, COMPRESS_FORMAT, QUALITY)
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log(err)
  })
