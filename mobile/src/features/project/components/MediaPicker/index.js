import React, { Component } from 'react'
import { CameraRoll, FlatList, ActivityIndicator } from 'react-native'
import MediaItem from './Item'

const PAGE_SIZE = 32
const MAX_FIELES = 10

function existsInArray(array, property, value) {
  return array.map(o => o.image[property]).indexOf(value)
}

export default class MediaPicker extends Component {
  state = {
    data: [],
    end_cursor: null,
    has_next_page: true,
    isLoading: true,
  }

  getFiles = async after => {
    const { data, has_next_page: hasNextPage } = this.state

    if (!hasNextPage) return

    try {
      const result = await CameraRoll.getPhotos({ first: PAGE_SIZE, after })
      this.setState({
        data: data.concat(result.edges),
        ...result.page_info,
      })
    } catch (err) {
      // logError(err)
    }
  }

  onEndReached = () => {
    const { has_next_page: hasNextPage } = this.state
    if (hasNextPage) {
      this.getFiles(this.state.end_cursor)
    }
  }

  toggleSelection = item => {
    const { onSelect, selectedFiles } = this.props

    const index = existsInArray(selectedFiles, 'uri', item.image.uri)

    // && last(selectedFiles).image.filename === item.image.filename
    if (index >= 0) {
      selectedFiles.splice(index, 1)
    }

    if (MAX_FIELES > selectedFiles.length) {
      selectedFiles.push(item)
    }

    onSelect(selectedFiles)
  }

  renderFooterLoader = () => {
    if (this.state.hasNextPage) {
      return <ActivityIndicator color={this.state.activityIndicatorColor} />
    }

    return null
  }

  renderItem = ({ item }) => {
    const { selectedFiles } = this.props
    const index = existsInArray(selectedFiles, 'uri', item.uri)
    const isSelected = index >= 0
    const order = index + 1

    return (
      <MediaItem item={item} selected={isSelected} order={order} onPress={this.toggleSelection} />
    )
  }

  render() {
    const { data, isLoading } = this.state

    if (isLoading) return null

    return (
      <FlatList
        style={{ flex: 1 }}
        ListFooterComponent={this.renderFooterLoader}
        contentContainerStyle={{ padding: 3 }}
        initialNumToRender={PAGE_SIZE}
        onEndReached={this.onEndReached}
        renderItem={this.renderItem}
        keyExtractor={item => item.uri}
        data={data}
      />
    )
  }
}
