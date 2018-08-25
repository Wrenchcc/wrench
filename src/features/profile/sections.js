import NativeShare from 'react-native-share'
import { mergeAll } from 'ramda'
import { navigate, navigateToWebView } from 'navigation'
import openLink from 'utils/openLink'
import { warn } from 'utils/logger'

// TODO: Add global url
const WEBSITE_URL = 'https://wrench.cc'

const generateLanguageSettings = props => {
  let items = []

  items = props.supportedLanguages.map(lang => ({
    titleKey: `languages.${lang}`,
    onPress: () => props.currentLanguage !== lang && props.changeLanguage(lang),
    type: 'selector',
    selected: props.currentLanguage === lang,
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
          }).catch(err => warn(err)),
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
      data: [
        {
          titleKey: 'followers',
          type: 'switch',
          value: true,
        },
        {
          titleKey: 'comments',
          type: 'switch',
          value: false,
        },
        {
          titleKey: 'mentions',
          type: 'switch',
          value: true,
        },
        {
          titleKey: 'articles',
          type: 'switch',
          value: true,
        },
      ],
    },
  ],
  language: [
    {
      headerTitle: 'language',
      data: generateLanguageSettings(props),
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
  settings: [
    {
      titleKey: 'invite',
    },
  ],
  facebook: [
    {
      headerTitle: 'facebook',
    },
  ],
  contacts: [
    {
      headerTitle: 'contacts',
    },
  ],
  'push-notifications': [
    {
      headerTitle: 'push-notifications',
    },
  ],
  language: [
    {
      headerTitle: 'language',
    },
  ],
  support: [
    {
      headerTitle: 'support',
    },
  ],
}

export const mapRouteForSection = component => mergeAll(
  Object.keys(routeSections).map(section => ({
    [section]: {
      component,
    },
  }))
)

export default sections
