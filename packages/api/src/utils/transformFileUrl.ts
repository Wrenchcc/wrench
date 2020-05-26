// const { CDN_DOMAIN } = process.env

const CDN_DOMAIN = 'https://cdn.wrench.cc'

export const transformFileUrl = (filename) => `${CDN_DOMAIN}/images/${filename}`
