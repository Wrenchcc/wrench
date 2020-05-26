const { CDN_DOMAIN } = process.env

const NEW_CDN_DOMAIN = 'https://cdn.wrench.cc'

export const transformFileUrl = (filename, isAdmin) =>
  `${isAdmin ? NEW_CDN_DOMAIN : CDN_DOMAIN}/images/${filename}`
