import React, { useState, useCallback, memo, useEffect } from 'react'
import { View, Dimensions, useColorScheme } from 'react-native'
import { useTranslation } from 'react-i18next'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import PlatformColor from 'ui/PlatformColor'
import { NAVIGATION } from 'navigation'
import { FONTS } from 'ui/constants'
import Users from './Users'
import Projects from './Projects'
import Hashtags from './Hashtags'
import { isAndroid } from 'utils/platform'

const { width, height } = Dimensions.get('window')

const initialLayout = {
  width,
  height: height - NAVIGATION.TOTAL_TOP_BAR_HEIGHT,
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

const styles = {
  base: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: PlatformColor.default,
    paddingTop: NAVIGATION.TOTAL_TOP_BAR_HEIGHT,
    zIndex: 1000,
  },
}

function Search() {
  const { t } = useTranslation('search')
  const [index, setIndex] = useState(0)
  const colorScheme = useColorScheme()

  const tabBarStyles = {
    indicatorStyle: {
      backgroundColor: colorScheme === 'dark' ? 'white' : 'black',
      height: 3,
    },
    labelStyle: {
      color: colorScheme === 'dark' ? 'white' : 'black',
      fontFamily: FONTS.MEDIUM,
      fontSize: 15,
      textTransform: 'none',
    },
    tabBar: {
      backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
      elevation: 0,
      height: isAndroid ? 65 : 50,
      justifyContent: 'center',
    },
  }

  useEffect(() => {
    setIndex(0)
  }, [])

  const handleIndexChange = useCallback(
    (activeIndex) => {
      setIndex(activeIndex)
    },
    [index]
  )

  // t('users')
  // t('projects')
  // t('hashtags')
  const handleLabelText = useCallback(({ route }) => t(route.key), [t])

  const renderScene = SceneMap({
    users: Users,
    projects: Projects,
    hashtags: Hashtags,
  })

  const renderTabBar = useCallback(
    (props) => (
      <TabBar
        {...props}
        style={tabBarStyles.tabBar}
        labelStyle={tabBarStyles.labelStyle}
        indicatorStyle={tabBarStyles.indicatorStyle}
        getLabelText={handleLabelText}
      />
    ),
    []
  )

  return (
    <View style={styles.base}>
      <TabView
        keyboardDismissMode="none"
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
        initialLayout={initialLayout}
        lazy
      />
    </View>
  )
}

export default memo(Search)
