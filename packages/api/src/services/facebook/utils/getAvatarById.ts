const { CDN_DOMAIN } = process.env

export default id => `${CDN_DOMAIN}/avatar/${id}.jpg`
