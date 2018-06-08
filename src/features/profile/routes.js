import React from 'react'
import { TAB } from 'navigation'
import { profile } from 'images'
import Profile from './containers/Profile'
import Settings from './containers/Settings'
import ContactButton from './components/ContactButton'
import { ROUTE_NAMES } from './constants'
import { mapRouteForSection } from './sections'

export default {
  [ROUTE_NAMES.ME]: {
    component: Profile,
    mode: TAB,
    navigationOptions: {
      tabBarIconSource: profile,
      tabBarFocusedIconSource: profile,
    },
  },
  [ROUTE_NAMES.PROFILE]: {
    component: Profile,
    navigationOptions: {
      headerRight: <ContactButton />,
    },
  },
  ...mapRouteForSection(Settings),
}
