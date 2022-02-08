const { CDN_DOMAIN } = process.env
import { getDirectory } from './getExtFromType'

export const transformPosterUrl = ({ poster }) => `${CDN_DOMAIN}/images/${poster}`

export const transformFileUrl = ({ filename, type }) =>
  `${CDN_DOMAIN}/${getDirectory(type)}/${filename}`
