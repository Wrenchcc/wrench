import React, { useState, useCallback } from 'react'
import { Dimensions, Keyboard } from 'react-native'
import { useTranslation } from 'react-i18next'
import { TabView, TabBar, PagerExperimental } from 'react-native-tab-view'
import * as GestureHandler from 'react-native-gesture-handler'
import { FONTS } from 'ui/constants'
import Users from './Users'
import Projects from './Projects'
import { Base } from './styles'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
}

const routes = [
  {
    key: 'users',
  },
  {
    key: 'projects',
  },
]

const styles = {
  indicatorStyle: {
    backgroundColor: 'black',
    height: 3,
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 0,
  },
  labelStyle: {
    color: 'black',
    fontFamily: FONTS.MEDIUM,
    fontSize: 15,
  },
}

const renderPager = props => (
  <PagerExperimental GestureHandler={GestureHandler} swipeEnabled animationEnabled {...props} />
)

function Search({ query, active }) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)

  const handleIndexChange = useCallback(
    activeIndex => {
      Keyboard.dismiss()
      setIndex(activeIndex)
    },
    [index]
  )

  const handleLabelText = useCallback(({ route }) => t(`Search:${route.key}`), [t])

  const renderScene = useCallback(
    ({ route }) => {
      switch (route.key) {
        case 'users':
          return <Users query={query} />
        case 'projects':
          return <Projects query={query} />
        default:
          return null
      }
    },
    [query]
  )

  const renderTabBar = useCallback(
    props => (
      <TabBar
        {...props}
        style={styles.tabBar}
        labelStyle={styles.labelStyle}
        indicatorStyle={styles.indicatorStyle}
        getLabelText={handleLabelText}
      />
    ),
    []
  )

  if (!active) {
    return null
  }

  return (
    <Base>
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        renderPager={renderPager}
        onIndexChange={handleIndexChange}
        initialLayout={initialLayout}
        lazy
      />
    </Base>
  )
}

export default Search
