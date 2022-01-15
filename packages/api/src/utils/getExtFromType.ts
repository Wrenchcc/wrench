import { FILE_TYPES } from './enums'

export function getExtFromType(type) {
  switch (type) {
    case FILE_TYPES.IMAGE:
      return 'jpg'
    case FILE_TYPES.VIDEO:
      return 'mp4'
    default:
      return null
  }
}

export function getDirectory(type) {
  switch (type) {
    case FILE_TYPES.IMAGE:
      return 'images'
    case FILE_TYPES.VIDEO:
      return 'videos'
    default:
      return null
  }
}
