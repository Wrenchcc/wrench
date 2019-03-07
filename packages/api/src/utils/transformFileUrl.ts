const { CDN_DOMAIN } = process.env

export default filename => `${CDN_DOMAIN}/images/${filename}`
