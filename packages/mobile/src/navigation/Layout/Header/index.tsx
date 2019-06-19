import React, { useContext } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import SearchBar from 'components/SearchBar'
import { Toast } from 'ui'
import { ListContext } from '../context'
import { transformContainer, opacityContent } from './animation'
import styles from './styles'

function Header({
  query,
  search,
  onQueryChange,
  onSearchCancel,
  onSearchClear,
  onSearchFocus,
  searchActive,
  headerRight,
  headerLeft,
  stickyComponent,
}) {
  const { translateY, headerHeight } = useContext(ListContext)

  return (
    <Animated.View style={[styles.container, transformContainer(translateY, headerHeight)]}>
      <View style={styles.background}>
        <View style={styles.header}>
          <Animated.View style={opacityContent(translateY, headerHeight)}>
            <View style={styles.inner}>
              {headerLeft}
              {search && (
                <SearchBar
                  onChangeQuery={onQueryChange}
                  onSearchCancel={onSearchCancel}
                  onSearchFocus={onSearchFocus}
                  onSearchClear={onSearchClear}
                  query={query}
                  searchActive={searchActive}
                />
              )}
              {!searchActive && headerRight}
            </View>
          </Animated.View>
        </View>
      </View>
      {!searchActive && (
        <>
          <Toast />
          {stickyComponent}
        </>
      )}
    </Animated.View>
  )
}

export default Header
