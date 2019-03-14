import { FILE_TYPES } from './enums'

export default function getExtFromType(type) {
  switch (type) {
    case FILE_TYPES.IMAGE:
      return 'jpg'
    case FILE_TYPES.VIDEO:
      return 'mp4'
    default:
      return null
  }
}
