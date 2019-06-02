import React, { useState, useCallback, Fragment } from 'react'
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
  tabBar: {
    backgroundColor: 'white',
    elevation: 0,
  },
  labelStyle: {
    color: 'black',
    fontSize: 15,
    fontFamily: FONTS.MEDIUM,
  },
  indicatorStyle: {
    backgroundColor: 'black',
    height: 3,
  },
}

function Search({ query, active }) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)

  const handleIndexChange = useCallback(
    index => {
      Keyboard.dismiss()
      setIndex(index)
    },
    [index]
  )

  const renderPager = props => (
    <PagerExperimental GestureHandler={GestureHandler} swipeEnabled animationEnabled {...props} />
  )

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'users':
        return <Users query={query} />
      case 'projects':
        return <Projects query={query} />
      default:
        return null
    }
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.tabBar}
      labelStyle={styles.labelStyle}
      indicatorStyle={styles.indicatorStyle}
      getLabelText={({ route }) => t(`Search:${route.key}`)}
      swipeEnabled
      scrollEnabled={false}
    />
  )

  if (!active) return null

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
        swipeEnabled
        lazy
        animationEnabled
        useNativeDriver
      />
    </Base>
  )
}

export default Search
