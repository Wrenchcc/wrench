import React, { useContext } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import SearchBar from 'components/SearchBar'
import { ListContext } from 'navigation/Layout/context'
import { Text, ToastNotification } from 'ui'
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
      <ToastNotification />
      {stickyComponent}
    </Animated.View>
  )
}

export default Header
