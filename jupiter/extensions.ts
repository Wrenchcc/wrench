type Extension = keyof typeof Extensions

export enum Extensions {
  jpg = 'image/jpeg',
  png = 'image/png',
  mp4 = 'video/mp4',
}

export function getContentType(ext: Extension): Extensions | undefined {
  return Extensions[ext]
}

export function getExtensionType(filename: string): string | undefined {
  return filename.substr(filename.lastIndexOf('.') + 1)
}
