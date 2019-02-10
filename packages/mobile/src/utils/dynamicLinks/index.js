import { Platform } from 'react-native'
import url from 'url'

const uriPrefix = Platform.OS === 'android' ? 'wrench://wrench/' : 'wrench://'

export const extractDeepLinkFromDynamicLink = (dynamicLink = '') => {
  const { path } = url.parse(dynamicLink)

  const uri = path.substring(1)
  return `${uriPrefix}${uri}`
}

export const formatDeepLink = path => `${uriPrefix}${path}`
