import { links } from 'react-native-firebase'

const BASE = 'https://wrench.cc'
const DOMAIN = 'wrench.page.link'

export const createDynamicLink = async ({
  path,
  title = false,
  description = false,
  image = false,
  forcedRedirectEnabled = false,
}) => {
  const link = new links.DynamicLink(`${BASE}/${path}`, DOMAIN).android
    .setPackageName('com.wrench')
    .ios.setBundleId('cc.wrench.app')

  if (title) {
    link.social.setTitle(title)
  }

  if (description) {
    link.social.setDescriptionText(description)
  }

  if (image) {
    link.social.setImageUrl(image)
  }

  if (forcedRedirectEnabled) {
    link.navigation.setForcedRedirectEnabled(forcedRedirectEnabled)
  }

  return links().createShortDynamicLink(link, 'SHORT')
}
