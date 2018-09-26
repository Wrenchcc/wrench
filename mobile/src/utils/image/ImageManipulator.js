import ImageResizer from 'react-native-image-resizer'

const DEFAULT_SIZE = 1048
const COMPRESS_FORMAT = 'JPEG'
const QUALITY = 80

// TODO: Fix scaling
export default async uri => ImageResizer.createResizedImage(uri, DEFAULT_SIZE, DEFAULT_SIZE, COMPRESS_FORMAT, QUALITY)
