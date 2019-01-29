const { APP_CDN_DOMAIN } = process.env

export default filename => `${APP_CDN_DOMAIN}/${filename}`
