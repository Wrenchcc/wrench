import React from 'react'
import NativeShare from 'react-native-share'
import { mergeAll, pathOr } from 'ramda'
import { t } from 'i18n/withLocalization'
import { navigate, navigateToSignIn, navigateToWebView } from 'navigation'
import openLink from 'utils/openLink'
import { HeaderTitle } from 'ui'

const WEBSITE_URL = 'https://wrench.cc'

const sections = {
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
            }).catch(err => console.log(err)), // eslint-disable-line
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
          onPress: () => navigateToSignIn(),
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
      ],
    },
  ],
  language: [
    {
      headerTitle: 'language',
      data: [
        {
          titleKey: 'english',
          type: 'selector',
          key: 'en',
          value: 'en',
        },
        {
          titleKey: 'swedish',
          type: 'selector',
          key: 'sv_SE',
          value: 'sv_SE',
        },
      ],
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
        {
          titleKey: 'hookie',
        },
      ],
    },
  ],
}

export function mapRouteForSection(component) {
  return mergeAll(
    Object.keys(sections).map(section => {
      const title = t(`Settings.${pathOr('settings', [0, 'headerTitle'], sections[section])}`)
      return {
        [section]: {
          component,
          navigationOptions: {
            headerTitle: <HeaderTitle>{title}</HeaderTitle>,
          },
        },
      }
    })
  )
}

export default sections
