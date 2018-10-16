import NativeShare from 'react-native-share'
import { mergeAll } from 'ramda'
import { navigate, navigateToWebView } from 'navigation'
import { askForRating } from 'utils/rate'
import openLink from 'utils/openLink'
import { logError } from 'utils/analytics'

const WEBSITE_URL = 'https://wrench.cc'

const generateLanguageSettings = props => {
  const { availableLocales, currentLocale, changeLocale } = props
  let items = []

  items = availableLocales.map(locale => ({
    titleKey: `languages.${locale}`,
    onPress: () => currentLocale !== locale && changeLocale(locale),
    type: 'selector',
    selected: currentLocale === locale,
  }))

  return items
}

const generateNotificationSettings = ({ settings, toggleNotificationSettings }) => {
  if (!settings) return null

  const types = Object.keys(settings.notifications.types).filter(type => type !== '__typename')
  let items = []

  items = types.map(type => ({
    titleKey: `notifications.${type}`,
    onPress: () => toggleNotificationSettings({
      deliveryMethod: 'push',
      notificationType: type,
    }),
    type: 'switch',
    selected: settings.notifications.types[type].push,
  }))

  return items
}

const sections = props => ({
  settings: [
    {
      titleKey: 'invite',
      data: [
        {
          titleKey: 'share',
          onPress: () => NativeShare.open({
            title: 'shareContent',
            url: WEBSITE_URL,
          }).catch(err => logError(err)),
        },
      ],
    },
    {
      titleKey: 'settings',
      data: [
        {
          titleKey: 'push-notifications',
          hasChildren: true,
          onPress: () => navigate('push-notifications'),
        },
        {
          titleKey: 'language',
          hasChildren: true,
          onPress: () => navigate('language'),
        },
      ],
    },
    {
      titleKey: 'general',
      data: [
        {
          titleKey: 'support',
          hasChildren: true,
          onPress: () => navigate('support'),
        },
        {
          titleKey: 'terms',
          onPress: () => navigateToWebView({ url: 'https://wrench.cc' }),
        },
        {
          titleKey: 'website',
          onPress: () => navigateToWebView({ url: 'https://wrench.cc' }),
        },
        {
          titleKey: 'credits',
          hasChildren: true,
          onPress: () => navigate('credits'),
        },
        {
          titleKey: 'rate',
          onPress: () => askForRating({ preferInApp: true }),
        },
        {
          titleKey: 'logout',
          onPress: () => props.changeLoginState(false),
          last: true,
        },
      ],
    },
  ],
  facebook: [
    {
      headerTitle: 'facebook',
      data: [{}],
    },
  ],
  contacts: [
    {
      headerTitle: 'contacts',
      data: [{}],
    },
  ],
  'push-notifications': [
    {
      headerTitle: 'push-notifications',
      data: generateNotificationSettings(props),
    },
  ],
  language: [
    {
      headerTitle: 'language',
      data: generateLanguageSettings(props),
    },
  ],
  membership: [
    {
      headerTitle: 'membership',
      data: [{}],
    },
  ],
  support: [
    {
      headerTitle: 'support',
      data: [
        {
          titleKey: 'faq',
          onPress: () => navigateToWebView({ url: 'https://wrench.cc' }),
        },
        {
          titleKey: 'report',
          onPress: () => openLink('mailto:support@wrench.cc?subject=Bug'),
        },
        {
          titleKey: 'chat',
          onPress: () => openLink('https://m.me/wrench.cc'),
        },
      ],
    },
  ],
  credits: [
    {
      headerTitle: 'credits',
      data: [
        {
          titleKey: 'knallpott',
        },
      ],
    },
  ],
})

const routeSections = {
  settings: [{ titleKey: 'invite' }],
  facebook: [{ headerTitle: 'facebook' }],
  contacts: [{ headerTitle: 'contacts' }],
  'push-notifications': [{ headerTitle: 'push-notifications' }],
  language: [{ headerTitle: 'language' }],
  membership: [{ headerTitle: 'membership' }],
  support: [{ headerTitle: 'support' }],
}

export const mapRouteForSection = component => mergeAll(
  Object.keys(routeSections).map(section => ({
    [section]: {
      component,
    },
  }))
)

export default sections
