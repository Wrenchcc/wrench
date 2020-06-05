import React, { useState, useCallback, memo, useEffect } from 'react'
import { Dimensions, useColorScheme } from 'react-native'
import { useTranslation } from 'react-i18next'
import { TabView, TabBar } from 'react-native-tab-view'
import { FONTS } from 'ui/constants'
import Users from './Users'
import Projects from './Projects'
import Hashtags from './Hashtags'
import { Base } from './styles'

const initialLayout = {
  width: Dimensions.get('window').width,
}

const routes = [
  {
    key: 'users',
  },
  {
    key: 'projects',
  },
  {
    key: 'hashtags',
  },
]

function Search({ query }) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const colorScheme = useColorScheme()

  useEffect(() => {
    setIndex(0)
  }, [setIndex])

  const handleIndexChange = useCallback(
    (activeIndex) => {
      setIndex(activeIndex)
    },
    [index]
  )

  const styles = {
    indicatorStyle: {
      backgroundColor: colorScheme === 'dark' ? 'white' : 'black',
      height: 3,
    },
    labelStyle: {
      color: colorScheme === 'dark' ? 'white' : 'black',
      fontFamily: FONTS.MEDIUM,
      fontSize: 15,
    },
    tabBar: {
      backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
      elevation: 0,
    },
  }

  const handleLabelText = useCallback(({ route }) => t(`Search:${route.key}`), [t])

  const renderScene = useCallback(
    ({ route }) => {
      switch (route.key) {
        case 'users':
          return <Users query={query} />
        case 'projects':
          return <Projects query={query} />
        case 'hashtags':
          return <Hashtags query={query} />
        default:
          return null
      }
    },
    [query]
  )

  const renderTabBar = useCallback(
    (props) => (
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

  return (
    <Base>
      <TabView
        keyboardDismissMode="none"
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
        initialLayout={initialLayout}
        lazy
      />
    </Base>
  )
}

export default memo(Search)
