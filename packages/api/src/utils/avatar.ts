// const { CDN_DOMAIN } = process.env

const CDN_DOMAIN = 'https://cdn.wrench.cc'

export function getAvatarById(id) {
  return `${CDN_DOMAIN}/avatar/${id}.jpg`
}

export function getAvatarByFilename(filename) {
  return `${CDN_DOMAIN}/avatar/${filename}`
}

export function getDefaultAvatar() {
  return `${CDN_DOMAIN}/avatar/default.jpg`
}
