const { CDN_DOMAIN } = process.env
import { getDirectory } from './getExtFromType'

export const transformFileUrl = ({ filename, type }) =>
  `${CDN_DOMAIN}/${getDirectory(type)}/${filename}`
