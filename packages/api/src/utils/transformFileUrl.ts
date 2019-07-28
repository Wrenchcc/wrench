const { CDN_DOMAIN } = process.env

export const transformFileUrl = filename => `${CDN_DOMAIN}/images/${filename}`

export const transformArticleFileUrl = filename => `${CDN_DOMAIN}/articles/${filename}`
