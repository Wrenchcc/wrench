import { Platform } from 'react-native'
import Config from 'react-native-config'
import url from 'url'

const uriPrefix = Platform.OS === 'android'
  ? `${Config.WRENCH_DEEP_LINK_BASE}wrench/`
  : Config.WRENCH_DEEP_LINK_BASE

export const extractDeepLinkFromDynamicLink = (dynamicLink = '') => {
  const { path } = url.parse(dynamicLink)

  const uri = path.substring(1)
  return `${uriPrefix}${uri}`
}
