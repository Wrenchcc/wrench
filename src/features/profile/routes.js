import React from 'react'
import { TAB } from 'navigation'
import { profile } from 'images'
import Profile from './containers/Profile'
import Me from './containers/Me'
import Settings from './containers/Settings'
import ContactButton from './components/ContactButton'
import { ROUTE_NAMES } from './constants'
import { mapRouteForSection } from './sections'

export default {
  [ROUTE_NAMES.ME]: {
    component: Me,
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
