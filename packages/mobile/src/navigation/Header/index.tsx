import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Search } from 'ui'
import { ListContext } from 'navigation/Layout/ListContext'
import { transformContainer, opacityContent } from './animation'
import styles from './styles'

function Header({
  query,
  onQueryChange,
  onSearchCancel,
  onSearchClear,
  onSearchFocus,
  searchActive,
}) {
  const { translateY, headerHeight } = useContext(ListContext)

  return (
    <Animated.View style={[styles.container, transformContainer(translateY, headerHeight)]}>
      <View style={styles.header}>
        <Animated.View style={opacityContent(translateY, headerHeight)}>
          <View style={styles.inner}>
            <Search
              onChangeQuery={onQueryChange}
              onSearchCancel={onSearchCancel}
              onSearchFocus={onSearchFocus}
              onSearchClear={onSearchClear}
              query={query}
              searchActive={searchActive}
            />
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  )
}

Header.propTypes = {
  onQueryChange: PropTypes.func,
  query: PropTypes.string,
  onSearchFocus: PropTypes.func,
  onSearchCancel: PropTypes.func,
  searchActive: PropTypes.bool,
  tabBar: PropTypes.node,
}

export default Header
