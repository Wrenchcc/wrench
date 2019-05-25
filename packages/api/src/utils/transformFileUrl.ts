const { CDN_DOMAIN = 'https://edge-files.wrench.cc' } = process.env

export default filename => `${CDN_DOMAIN}/images/${filename}`
