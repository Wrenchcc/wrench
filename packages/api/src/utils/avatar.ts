const { CDN_DOMAIN } = process.env

export function getAvatarById(id) {
  return `${CDN_DOMAIN}/avatar/${id}.jpg`
}

export function getDefaultAvatar() {
  return `${CDN_DOMAIN}/avatar/default.jpg`
}
