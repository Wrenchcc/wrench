import { Alert } from 'react-native'
import NativeShare from 'react-native-share'
import { locales } from '@wrench/translations'
import i18next from 'i18next'
import { setLocale, updateUserLocale } from 'i18n'
import { SCREENS } from 'navigation'
import { client } from 'gql'
import { askForRating } from 'utils/rate'
import openLink from 'utils/openLink'
import { logError } from 'utils/sentry'

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

const generateLanguageSettings = (t) => {
  let items = []

  const currentLocale = i18next.language

  items = locales.map((locale) => ({
    title: t(`languages:${locale}`),
    onPress: () => currentLocale !== locale && changeLocale(locale),
    type: 'selector',
    selected: currentLocale === locale,
  }))

  return items
}

const generateNotificationSettings = (
  { settings, handleToggleNotificationSettings, t },
  deliveryMethod
) => {
  if (!settings) {
    return null
  }

  const types = Object.keys(settings.notifications.types).filter((type) => type !== '__typename')
  let items = []

  items = types.map((type) => ({
    title: t(`notifications:${type}`),
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

const sections = ({ t, ...props }) => {
  const data = {
    settings: [
      {
        title: t('settings:invite'),
        data: [
          {
            title: t('settings:share'),
            onPress: () =>
              NativeShare.open({
                title: t('shareContent'),
                url: WEBSITE_URL,
              }).catch(() => {}),
          },
        ],
      },
      {
        title: t('settings:settings'),
        data: [
          {
            title: t('settings:customize-interests'),
            onPress: () =>
              props.navigate(SCREENS.ONBOARDING, {
                settingsPage: true,
              }),
          },
          {
            title: t('settings:push-notifications'),
            hasChildren: true,
            onPress: () =>
              props.navigate(SCREENS.SETTINGS, {
                section: 'push-notifications',
              }),
          },
          {
            title: t('settings:email-notifications'),
            hasChildren: true,
            onPress: () =>
              props.navigate(SCREENS.SETTINGS, {
                section: 'email-notifications',
              }),
          },
          {
            title: t('settings:language'),
            hasChildren: true,
            onPress: () =>
              props.navigate(SCREENS.SETTINGS, {
                section: 'language',
              }),
          },
        ],
      },
      {
        title: t('settings:general'),
        data: [
          {
            title: t('support'),
            hasChildren: true,
            onPress: () =>
              props.navigate(SCREENS.SETTINGS, {
                section: 'support',
              }),
          },
          {
            title: t('settings:terms'),
            onPress: () => props.showModal(SCREENS.WEBVIEW, { url: 'https://wrench.cc/terms' }),
          },
          {
            title: t('settings:website'),
            onPress: () => props.showModal(SCREENS.WEBVIEW, { url: 'https://wrench.cc' }),
          },
          {
            title: t('settings:credits'),
            hasChildren: true,
            onPress: () =>
              props.navigate(SCREENS.SETTINGS, {
                section: 'credits',
              }),
          },
          {
            title: t('settings:rate'),
            onPress: () => askForRating(),
          },
          {
            title: t('settings:delete'),
            onPress: () =>
              Alert.alert(
                t('settings:deleteTitle'),
                t('settings:deleteDescription'),
                [
                  {
                    text: t('settings:deleteCancel'),
                    style: 'cancel',
                  },
                  {
                    text: t('settings:deleteOk'),
                    onPress: () => {
                      client.clearStore()
                      props.deleteUser()
                    },
                  },
                ],
                { cancelable: false }
              ),
          },
          {
            title: t('settings:logout'),
            onPress: () => client.clearStore(),
            important: true,
          },
        ],
      },
    ],
    facebook: [
      {
        headerTitle: t('settings:facebook'),
        data: [{}],
      },
    ],
    contacts: [
      {
        headerTitle: t('settings:contacts'),
        data: [{}],
      },
    ],
    'push-notifications': [
      {
        headerTitle: t('settings:push-notifications'),
        data: generateNotificationSettings({ t, ...props }, 'push'),
      },
    ],
    'email-notifications': [
      {
        headerTitle: t('settings:email-notifications'),
        data: generateNotificationSettings({ t, ...props }, 'email'),
      },
    ],
    language: [
      {
        headerTitle: t('settings:language'),
        data: generateLanguageSettings(t),
      },
    ],
    membership: [
      {
        headerTitle: t('settings:membership'),
        data: [{}],
      },
    ],
    support: [
      {
        headerTitle: t('settings:support'),
        data: [
          {
            title: t('settings:faq'),
            onPress: () => props.showModal(SCREENS.WEBVIEW, { url: 'https://wrench.cc/faq' }),
          },
          {
            title: t('settings:report'),
            onPress: () => openLink('mailto:support@wrench.cc?subject=Bug Report'),
          },
          {
            title: t('settings:chat'),
            onPress: () => openLink('https://m.me/wrench.cc'),
          },
        ],
      },
    ],
    credits: [
      {
        headerTitle: t('credits'),
        data: [
          {
            title: 'Knallpott',
            onPress: () => props.showModal(SCREENS.WEBVIEW, { url: 'https://knallpott.de' }),
          },
          {
            title: 'Paal Motorcycles',
            onPress: () => props.showModal(SCREENS.WEBVIEW, { url: 'http://paalmotorcycles.com' }),
          },
          {
            title: 'Kismo motors',
            onPress: () => props.showModal(SCREENS.WEBVIEW, { url: 'http://kismomotors.com' }),
          },
          {
            title: 'Motorfabriken',
            onPress: () =>
              props.showModal(SCREENS.WEBVIEW, { url: 'https://www.instagram.com/motorfabriken' }),
          },
          {
            title: 'Hojstyling.se',
            onPress: () => props.showModal(SCREENS.WEBVIEW, { url: 'https://www.hojstyling.se' }),
          },
        ],
      },
    ],
  }

  return data
}
export default sections
