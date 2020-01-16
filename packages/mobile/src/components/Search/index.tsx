import React, { useState, useCallback, memo, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'
import { TabView, TabBar } from 'react-native-tab-view'
// import { useDebounce } from 'utils/hooks'
import { FONTS } from 'ui/constants'
import Users from './Users'
import Projects from './Projects'
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
]

const styles = {
  indicatorStyle: {
    backgroundColor: 'black',
    height: 3,
  },
  labelStyle: {
    color: 'black',
    fontFamily: FONTS.MEDIUM,
    fontSize: 15,
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 0,
  },
}

function Search({ query, active }) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [active, setIndex])

  const handleIndexChange = useCallback(
    activeIndex => {
      setIndex(activeIndex)
    },
    [index]
  )

  const handleLabelText = useCallback(({ route }) => t(`Search:${route.key}`), [t])

  // const debouncedQuery = useDebounce(query, 300)

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

  return (
    <Base active={active}>
      <TabView
        swipeVelocityThreshold={500}
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
