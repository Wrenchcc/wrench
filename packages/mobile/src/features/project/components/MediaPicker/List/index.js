import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import * as MediaLibrary from 'expo-media-library'
import { findIndex, propEq, prepend } from 'ramda'
import { logError } from 'utils/sentry'
import MediaItem from '../Item'

const NUM_COLUMNS = 4
const PAGE_SIZE = 30

export default class List extends Component {
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
      this.loadInitial()
    }

    if (!prevProps.cameraFile && this.props.cameraFile) {
      this.setState(prevState => ({
        data: prepend(this.props.cameraFile, prevState.data),
      }))
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
          <ActivityIndicator color="white" />
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
          <ActivityIndicator color="white" />
        </View>
      )
    }

    return (
      <FlatList
        contentContainerStyle={{ padding: 3 }}
        data={data}
        initialNumToRender={16}
        keyExtractor={item => item.uri}
        ListFooterComponent={this.renderFooterLoader}
        numColumns={NUM_COLUMNS}
        onEndReached={this.onEndReached}
        renderItem={this.renderItem}
      />
    )
  }
}
