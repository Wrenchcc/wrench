import React from 'react'
import NativeShare from 'react-native-share'
import { mergeAll, pathOr } from 'ramda'
import { t } from 'i18n'
import { resetStore } from 'graphql/utils/auth'
import { navigate, navigateToSignIn, navigateToWebView } from 'navigation'
import openLink from 'utils/openLink'
import { warn } from 'utils/logger'
import { HeaderTitle } from 'ui'

const WEBSITE_URL = 'https://wrench.cc'

const signOut = () => {
  resetStore()
  return navigateToSignIn()
}

const sections = {
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
          onPress: () => signOut(),
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
          value: true,
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
  // language: [
  //   {
  //     headerTitle: 'language',
  //     data: [
  //       {
  //         titleKey: 'english',
  //         type: 'selector',
  //         key: 'en',
  //         value: 'en',
  //         selected: true,
  //       },
  //       {
  //         titleKey: 'swedish',
  //         type: 'selector',
  //         key: 'sv_SE',
  //         value: 'sv_SE',
  //         selected: false,
  //       },
  //     ],
  //   },
  // ],
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
