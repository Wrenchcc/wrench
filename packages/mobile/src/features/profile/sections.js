import NativeShare from 'react-native-share'
import { mergeAll } from 'ramda'
import { navigateTo, SCREENS } from 'navigation/actions'
import { askForRating } from 'utils/rate'
import openLink from 'utils/openLink'

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
      notificationType: type,
    }),
    type: 'switch',
    selected: settings.notifications.types[type],
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
          }).catch(() => {}),
        },
      ],
    },
    {
      titleKey: 'settings',
      data: [
        {
          titleKey: 'push-notifications',
          hasChildren: true,
          onPress: () => navigateTo('push-notifications'),
        },
        {
          titleKey: 'language',
          hasChildren: true,
          onPress: () => navigateTo('language'),
        },
      ],
    },
    {
      titleKey: 'general',
      data: [
        {
          titleKey: 'support',
          hasChildren: true,
          onPress: () => navigateTo('support'),
        },
        {
          titleKey: 'terms',
          onPress: () => navigateTo(SCREENS.WEBVIEW, { url: 'https://wrench.cc/terms' }),
        },
        {
          titleKey: 'website',
          onPress: () => navigateTo(SCREENS.WEBVIEW, { url: 'https://wrench.cc' }),
        },
        {
          titleKey: 'credits',
          hasChildren: true,
          onPress: () => navigateTo('credits'),
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
          onPress: () => navigateTo(SCREENS.WEBVIEW, { url: 'https://wrench.cc/faq' }),
        },
        {
          titleKey: 'report',
          onPress: () => openLink('mailto:support@wrench.cc?subject=Bug Report'),
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
          onPress: () => navigateTo(SCREENS.WEBVIEW, { url: 'https://knallpott.de' }),
        },
        {
          titleKey: 'paal',
          onPress: () => navigateTo(SCREENS.WEBVIEW, { url: 'http://paalmotorcycles.com' }),
        },
        {
          titleKey: 'kismo',
          onPress: () => navigateTo(SCREENS.WEBVIEW, { url: 'http://kismomotors.com' }),
        },
        {
          titleKey: 'motorfabriken',
          onPress: () => navigateTo(SCREENS.WEBVIEW, { url: 'https://www.instagram.com/motorfabriken' }),
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
  credits: [{ headerTitle: 'credits' }],
}

export const mapRouteForSection = component => mergeAll(
  Object.keys(routeSections).map(section => ({
    [section]: {
      component,
    },
  }))
)

export default sections
