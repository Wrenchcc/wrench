import { FILE_TYPES } from './enums'

export const getFilenameExtention = (filename) => filename.split('.').pop()

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
      return 'unknown'
  }
}

export function getFileTypeFromFilename(filename) {
  const type = filename.split('.').pop()

  switch (type) {
    case 'jpg':
      return FILE_TYPES.IMAGE
    case 'mp4':
      return FILE_TYPES.VIDEO
    default:
      return FILE_TYPES.IMAGE
  }
}
