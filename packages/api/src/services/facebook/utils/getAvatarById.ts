const { CDN_DOMAIN = 'https://edge-files.wrench.cc' } = process.env

export default id => `${CDN_DOMAIN}/avatar/${id}.jpg`
