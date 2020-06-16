import NativeShare from 'react-native-share'
import { mergeAll } from 'rambda'
import AsyncStorage from '@react-native-community/async-storage'
import i18next from 'i18next'
import { setLocale, languages, updateUserLocale } from 'i18n'
import { SCREENS } from 'navigation'
import { client } from 'gql'
import { askForRating } from 'utils/rate'
import openLink from 'utils/openLink'
import { logError } from 'utils/sentry'
import { isAdmin } from 'utils/permissions'
import { setDeploymentKey, DEPLOYMENT_KEY_STAGING, DEPLOYMENT_KEY_PRODUCTION } from 'utils/codepush'

const WEBSITE_URL = 'https://wrench.cc'

const changeLocale = async (locale) => {
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

  items = languages.map((locale) => ({
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

  const types = Object.keys(settings.notifications.types).filter((type) => type !== '__typename')
  let items = []

  items = types.map((type) => ({
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

const sections = (props) => {
  const data = {
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
              props.navigate(SCREENS.ONBOARDING, {
                settingsPage: true,
              }),
          },
          {
            titleKey: 'push-notifications',
            hasChildren: true,
            onPress: () =>
              props.navigate(SCREENS.SETTINGS, {
                section: 'push-notifications',
              }),
          },
          {
            titleKey: 'email-notifications',
            hasChildren: true,
            onPress: () =>
              props.navigate(SCREENS.SETTINGS, {
                section: 'email-notifications',
              }),
          },
          {
            titleKey: 'language',
            hasChildren: true,
            onPress: () =>
              props.navigate(SCREENS.SETTINGS, {
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
              props.navigate(SCREENS.SETTINGS, {
                section: 'support',
              }),
          },
          {
            titleKey: 'terms',
            onPress: () => props.showModal(SCREENS.WEBVIEW, { url: 'https://wrench.cc/terms' }),
          },
          {
            titleKey: 'website',
            onPress: () => props.showModal(SCREENS.WEBVIEW, { url: 'https://wrench.cc' }),
          },
          {
            titleKey: 'credits',
            hasChildren: true,
            onPress: () =>
              props.navigate(SCREENS.SETTINGS, {
                section: 'credits',
              }),
          },
          {
            titleKey: 'rate',
            onPress: () => askForRating(),
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
            onPress: () => props.showModal(SCREENS.WEBVIEW, { url: 'https://wrench.cc/faq' }),
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
    codepush: [
      {
        headerTitle: 'credits',
        data: [
          {
            titleKey: 'stages.production',
            onPress: async () => setDeploymentKey(DEPLOYMENT_KEY_PRODUCTION),
            type: 'selector',
            selected: false,
          },
          {
            titleKey: 'stages.staging',
            onPress: async () => setDeploymentKey(DEPLOYMENT_KEY_STAGING),
            type: 'selector',
            selected: false,
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
            onPress: () => props.showModal(SCREENS.WEBVIEW, { url: 'https://knallpott.de' }),
          },
          {
            titleKey: 'paal',
            onPress: () => props.showModal(SCREENS.WEBVIEW, { url: 'http://paalmotorcycles.com' }),
          },
          {
            titleKey: 'kismo',
            onPress: () => props.showModal(SCREENS.WEBVIEW, { url: 'http://kismomotors.com' }),
          },
          {
            titleKey: 'motorfabriken',
            onPress: () =>
              props.showModal(SCREENS.WEBVIEW, { url: 'https://www.instagram.com/motorfabriken' }),
          },
          {
            titleKey: 'hojstyling',
            onPress: () => props.showModal(SCREENS.WEBVIEW, { url: 'https://www.hojstyling.se' }),
          },
        ],
      },
    ],
  }

  if (props.user && isAdmin(props.user)) {
    data.settings.push({
      titleKey: 'developer',
      data: [
        {
          titleKey: 'codepush',
          hasChildren: true,
          onPress: () =>
            props.navigate(SCREENS.SETTINGS, {
              section: 'codepush',
            }),
        },
        {
          titleKey: 'clear',
          onPress: async () => AsyncStorage.clear(),
        },
      ],
    })
  }

  return data
}

const routeSections = {
  settings: [{ titleKey: 'invite' }],
  facebook: [{ headerTitle: 'facebook' }],
  contacts: [{ headerTitle: 'contacts' }],
  'push-notifications': [{ headerTitle: 'push-notifications' }],
  language: [{ headerTitle: 'language' }],
  membership: [{ headerTitle: 'membership' }],
  support: [{ headerTitle: 'support' }],
  credits: [{ headerTitle: 'credits' }],
  developer: [{ headerTitle: 'developer' }],
}

export const mapRouteForSection = (component) =>
  mergeAll(
    Object.keys(routeSections).map((section) => ({
      [section]: {
        component,
      },
    }))
  )

export default sections
