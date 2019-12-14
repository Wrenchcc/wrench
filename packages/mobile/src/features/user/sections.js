import NativeShare from 'react-native-share'
import { mergeAll } from 'rambda'
import i18next from 'i18next'
import { setLocale, languages, updateUserLocale } from 'i18n'
import { navigateTo, showModal, SCREENS } from 'navigation'
import { client } from 'services/gql'
import { askForRating } from 'utils/rate'
import openLink from 'utils/openLink'
import { logError } from 'utils/sentry'

const WEBSITE_URL = 'https://wrench.cc'

const changeLocale = async locale => {
  try {
    i18next.changeLanguage(locale)
    await setLocale(locale)
    updateUserLocale(locale)
  } catch (err) {
    logError(err)
  }
}

const generateLanguageSettings = () => {
  let items = []

  const currentLocale = i18next.language

  items = languages.map(locale => ({
    titleKey: `languages.${locale}`,
    onPress: () => currentLocale !== locale && changeLocale(locale),
    type: 'selector',
    selected: currentLocale === locale,
  }))

  return items
}

const generateNotificationSettings = (
  { settings, handleToggleNotificationSettings },
  deliveryMethod
) => {
  if (!settings) {
    return null
  }

  const types = Object.keys(settings.notifications.types).filter(type => type !== '__typename')
  let items = []

  items = types.map(type => ({
    titleKey: `notifications.${type}`,
    onPress: () =>
      handleToggleNotificationSettings({
        notificationType: type,
        deliveryMethod,
      }),
    type: 'switch',
    selected: settings.notifications.types[type][deliveryMethod],
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
          onPress: () =>
            NativeShare.open({
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
          titleKey: 'customize-interests',
          onPress: () =>
            navigateTo(SCREENS.ONBOARDING, {
              settingsPage: true,
            }),
        },
        {
          titleKey: 'push-notifications',
          hasChildren: true,
          onPress: () =>
            navigateTo(SCREENS.SETTINGS, {
              section: 'push-notifications',
            }),
        },
        {
          titleKey: 'email-notifications',
          hasChildren: true,
          onPress: () =>
            navigateTo(SCREENS.SETTINGS, {
              section: 'email-notifications',
            }),
        },
        {
          titleKey: 'language',
          hasChildren: true,
          onPress: () =>
            navigateTo(SCREENS.SETTINGS, {
              section: 'language',
            }),
        },
      ],
    },
    {
      titleKey: 'general',
      data: [
        {
          titleKey: 'support',
          hasChildren: true,
          onPress: () =>
            navigateTo(SCREENS.SETTINGS, {
              section: 'support',
            }),
        },
        {
          titleKey: 'terms',
          onPress: () => showModal(SCREENS.WEBVIEW, { url: 'https://wrench.cc/terms' }),
        },
        {
          titleKey: 'website',
          onPress: () => showModal(SCREENS.WEBVIEW, { url: 'https://wrench.cc' }),
        },
        {
          titleKey: 'credits',
          hasChildren: true,
          onPress: () =>
            navigateTo(SCREENS.SETTINGS, {
              section: 'credits',
            }),
        },
        {
          titleKey: 'rate',
          onPress: () => askForRating({ preferInApp: true }),
        },
        {
          titleKey: 'logout',
          onPress: () => client.clearStore(),
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
      data: generateNotificationSettings(props, 'push'),
    },
  ],
  'email-notifications': [
    {
      headerTitle: 'email-notifications',
      data: generateNotificationSettings(props, 'email'),
    },
  ],
  language: [
    {
      headerTitle: 'language',
      data: generateLanguageSettings(),
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
          onPress: () => showModal(SCREENS.WEBVIEW, { url: 'https://wrench.cc/faq' }),
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
          onPress: () => showModal(SCREENS.WEBVIEW, { url: 'https://knallpott.de' }),
        },
        {
          titleKey: 'paal',
          onPress: () => showModal(SCREENS.WEBVIEW, { url: 'http://paalmotorcycles.com' }),
        },
        {
          titleKey: 'kismo',
          onPress: () => showModal(SCREENS.WEBVIEW, { url: 'http://kismomotors.com' }),
        },
        {
          titleKey: 'motorfabriken',
          onPress: () =>
            showModal(SCREENS.WEBVIEW, { url: 'https://www.instagram.com/motorfabriken' }),
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

export const mapRouteForSection = component =>
  mergeAll(
    Object.keys(routeSections).map(section => ({
      [section]: {
        component,
      },
    }))
  )

export default sections
