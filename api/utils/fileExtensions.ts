type FileExtension = keyof typeof FileExtensions

export enum FileExtensions {
  jpg = 'image/jpeg',
  png = 'image/png',
  mp4 = 'video/mp4',
}

export function getContentType(ext: FileExtension): FileExtensions | undefined {
  return FileExtensions[ext]
}

export function getExtensionType(filename) {
  return filename.substr(filename.lastIndexOf('.') + 1).toLowerCase()
}
