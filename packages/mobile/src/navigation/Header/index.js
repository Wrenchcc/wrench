import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Animated from 'react-native-reanimated'
import PropTypes from 'prop-types'
import SearchBar from 'ui/SearchBar'
import { withListContext } from 'navigation/Layout/ListContext'
import styles from './styles'

const { interpolate } = Animated

class Header extends Component {
  static propTypes = {
    onQueryChange: PropTypes.func,
    headerTitle: PropTypes.string,
    query: PropTypes.string,
    search: PropTypes.object,
    onSearchFocus: PropTypes.func,
    onSearchCancel: PropTypes.func,
    searchActive: PropTypes.bool,
    tabBar: PropTypes.node,
    listContext: PropTypes.object.isRequired,
  }

  get hasTitle() {
    const { headerTitle } = this.props
    return !this.hasSearch && headerTitle
  }

  get hasSearch() {
    return this.props.search
  }

  get showActions() {
    const { searchActive, actions } = this.props
    return !searchActive && actions && actions.length > 0
  }

  render() {
    const {
      search,
      headerTitle,
      // actions,
      query,
      onQueryChange,
      onSearchCancel,
      onSearchClear,
      onSearchFocus,
      searchActive,
      tabBar,
      listContext: { translateY, headerHeight },
    } = this.props

    const transformContainer = {
      transform: [
        {
          translateY: interpolate(translateY, {
            inputRange: [-headerHeight, 0],
            outputRange: tabBar ? [-(headerHeight - 10), 0] : [-headerHeight, 0],
          }),
        },
      ],
    }

    const opacityContent = {
      opacity: interpolate(translateY, {
        inputRange: [-headerHeight, 0],
        outputRange: [0, 1],
      }),
    }

    return (
      <Animated.View style={[styles.container, transformContainer]}>
        <View style={styles.header}>
          <Animated.View style={opacityContent}>
            <View style={styles.inner}>
              {this.hasTitle && <Text>{headerTitle}</Text>}
              {this.hasSearch && (
                <SearchBar
                  config={search}
                  onChangeQuery={onQueryChange}
                  onSearchCancel={onSearchCancel}
                  onSearchFocus={onSearchFocus}
                  onSearchClear={onSearchClear}
                  query={query}
                  searchActive={searchActive}
                />
              )}
            </View>
          </Animated.View>
        </View>
        {tabBar}
      </Animated.View>
    )
  }
}

export default withListContext(Header)
