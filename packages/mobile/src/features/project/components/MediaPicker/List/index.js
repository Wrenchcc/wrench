import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, View, ActivityIndicator, InteractionManager } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { findIndex, propEq, prepend } from 'ramda'
import { logError } from 'utils/analytics'
import MediaItem from '../Item'

const NUM_COLUMNS = 4
const PAGE_SIZE = 30

export default class List extends Component {
  static propTypes = {
    album: PropTypes.string,
    cameraFile: PropTypes.object,
  }

  state = {
    data: [],
    endCursor: null,
    hasNextPage: true,
    isLoading: true,
  }

  componentDidMount() {
    this.loadInitial()
  }

  componentDidUpdate(prevProps) {
    if (this.props.album !== prevProps.album) {
      this.showSpinner()

      InteractionManager.runAfterInteractions(() => {
        this.loadInitial()
      })
    }

    if (!prevProps.cameraFile && this.props.cameraFile) {
      this.setState({
        data: prepend(this.props.cameraFile, this.state.data),
      })
    }
  }

  showSpinner = () => {
    this.setState({ isLoading: true })
  }

  loadInitial = async () => {
    try {
      const result = await MediaLibrary.getAssetsAsync({
        album: this.props.album,
        first: PAGE_SIZE,
      })

      this.setState({
        data: result.assets,
        endCursor: result.endCursor,
        hasNextPage: result.hasNextPage,
        isLoading: false,
      })
    } catch (err) {
      logError(err)
    }
  }

  loadMore = async after => {
    const { data, hasNextPage } = this.state

    if (!hasNextPage) {
      return
    }

    try {
      const result = await MediaLibrary.getAssetsAsync({
        album: this.props.album,
        after,
        first: PAGE_SIZE,
      })

      this.setState({
        data: data.concat(result.assets),
        endCursor: result.endCursor,
        hasNextPage: result.hasNextPage,
      })
    } catch (err) {
      logError(err)
    }
  }

  onEndReached = () => {
    if (this.state.hasNextPage) {
      this.loadMore(this.state.endCursor)
    }
  }

  renderFooterLoader = () => {
    if (this.state.hasNextPage && this.state.data.length) {
      return (
        <View style={{ paddingTop: 30, paddingBottom: 30 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return null
  }

  renderItem = ({ item }) => {
    const selectedIndex = findIndex(propEq('uri', item.uri))(this.props.selected) // TODO: make util
    const isSelected = selectedIndex >= 0

    return (
      <MediaItem
        item={item}
        onPress={this.props.onSelect}
        order={selectedIndex + 1}
        selected={isSelected}
      />
    )
  }

  render() {
    const { data, isLoading } = this.state

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <FlatList
        contentContainerStyle={{ padding: 3 }}
        data={data}
        initialNumToRender={PAGE_SIZE}
        keyExtractor={item => item.uri}
        ListFooterComponent={this.renderFooterLoader}
        numColumns={NUM_COLUMNS}
        onEndReached={this.onEndReached}
        renderItem={this.renderItem}
      />
    )
  }
}
