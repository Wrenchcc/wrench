import React, { Component } from 'react'
import { FlatList, View, ActivityIndicator, Text } from 'react-native'
import GalleryManager from 'react-native-gallery-manager'
import { findIndex, propEq } from 'ramda'
import { logError } from 'utils/analytics'
import MediaItem from '../Item'

const NUM_COLUMNS = 4
const PAGE_SIZE = 80
const ASSET_TYPE = 'image'

export default class List extends Component {
  state = {
    data: [],
    hasMore: true,
    isLoading: true,
  }

  constructor(props) {
    super(props)

    this.getFiles()
  }

  getFiles = async after => {
    const { data, hasMore } = this.state
    if (!hasMore) return

    try {
      const result = await GalleryManager.getAssets({
        albumName: this.props.albumName,
        type: ASSET_TYPE,
        startFrom: after,
        limit: PAGE_SIZE,
      })

      this.setState({
        isLoading: false,
        hasMore: result.hasMore,
        data: data.concat(result.assets),
      })
    } catch (err) {
      logError(err)
    }
  }

  onEndReached = () => {
    if (this.state.hasMore) {
      this.getFiles(this.state.data.length)
    }
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
        contentContainerStyle={{ padding: 3 }}
        data={data}
        initialNumToRender={PAGE_SIZE}
        keyExtractor={item => item.uri}
        ListFooterComponent={this.renderFooterLoader}
        numColumns={NUM_COLUMNS}
        onEndReached={this.onEndReached}
        renderItem={this.renderItem}
        ListEmptyComponent={<Text style={{ color: 'white' }}>No photos.</Text>}
        style={{ flex: 1 }}
      />
    )
  }
}
