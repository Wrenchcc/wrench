import React, { Component } from 'react'
import { FlatList, View, ActivityIndicator, Text } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { findIndex, propEq, prepend } from 'ramda'
import { logError } from 'utils/analytics'
import MediaItem from '../Item'

const NUM_COLUMNS = 4
const PAGE_SIZE = 20

export default class List extends Component {
  state = {
    data: [],
    endCursor: null,
    hasNextPage: true,
    isLoading: true,
  }

  constructor(props) {
    super(props)

    this.getFiles()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.data !== nextState.data) {
      return true
    }

    return false
  }

  // componentDidUpdate(prevProps) {
  //   if (!prevProps.cameraFile && this.props.cameraFile) {
  //     this.setState({
  //       data: prepend(this.props.cameraFile, this.state.data),
  //     })
  //   }
  // }

  // getItemLayout = (data, index) => ({
  //   length: ITEM_SIZE,
  //   offset: ITEM_SIZE * index,
  //   index,
  // })

  getFiles = async after => {
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
        isLoading: false,
      })
    } catch (err) {
      logError(err)
    }
  }

  onEndReached = ({ distanceFromEnd }) => {
    // if (this.state.hasNextPage && distanceFromEnd > 0) {
    this.getFiles(this.state.endCursor)
    // }
  }

  renderFooterLoader = () => {
    if (this.state.hasNextPage) {
      return (
        <View style={{ paddingTop: 30, paddingBottom: 30 }}>
          <ActivityIndicator color={this.state.activityIndicatorColor} />
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
      return null
    }

    return (
      <FlatList
        contentContainerStyle={{ padding: 3, ...(!data.length && { flex: 1 }) }}
        data={data}
        initialNumToRender={PAGE_SIZE}
        keyExtractor={item => item.uri}
        ListFooterComponent={this.renderFooterLoader}
        numColumns={NUM_COLUMNS}
        onEndReached={this.onEndReached}
        renderItem={this.renderItem}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>No photos.</Text>
          </View>
        }
        style={{ flex: 1 }}
      />
    )
  }
}
