import { Platform } from 'react-native'
import Config from 'react-native-config'

const getDomainName = url => {
  let hostname
  // find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf('://') > -1) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }
  // find & remove port number
  hostname = hostname.split(':')[0]
  // find & remove "?"
  hostname = hostname.split('?')[0]
  hostname = hostname.replace('www.', '')

  return hostname
}

Array.prototype.remove = (from, to) => {
  const rest = this.slice((to || from) + 1 || this.length)
  this.length = from < 0 ? this.length + from : from
  return this.push.apply(this, rest)
}

export const extractDeepLinkFromDynamicLink = (dynamicLink = '') => {
  const arr = dynamicLink.split('/').filter(str => str.length)
  const hostname = getDomainName(dynamicLink)
  arr.forEach((str, index) => {
    if (str.indexOf('http') === 0 || str.indexOf('https') === 0 || str === hostname) {
      arr.remove(index, index + 1)
    }
  })
  if (Platform.OS === 'android') return `${hostname}://${hostname}/${arr.join('/')}`
  return `${hostname}://${arr.join('/')}`
}

export const uriPrefix = Platform.OS === 'android'
  ? `${Config.WRENCH_DEEP_LINK_BASE}wrench/`
  : Config.WRENCH_DEEP_LINK_BASE
