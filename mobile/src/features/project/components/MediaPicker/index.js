import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CameraRoll, FlatList, ActivityIndicator } from 'react-native'
import { findIndex, propEq, path } from 'ramda'
import { logError } from 'utils/analytics'
import MediaItem from './Item'

const PAGE_SIZE = 64
const MAX_SELECTED_FILES = 10
const NUM_COLUMNS = 4

export default class MediaPicker extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedFiles: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number,
  }

  static getDerivedStateFromProps({ selectedFiles }, state) {
    if (path([0, 'add'], selectedFiles)) {
      return {
        data: [path([0], selectedFiles), ...state.data],
      }
    }

    return state
  }

  state = {
    data: [],
    end_cursor: null,
    has_next_page: true,
  }

  componentDidMount() {
    this.getFiles()
  }

  getFiles = async after => {
    const { data, has_next_page: hasNextPage } = this.state

    if (!hasNextPage) return

    try {
      const result = await CameraRoll.getPhotos({ first: PAGE_SIZE, after })
      const loadedFiles = result.edges.map(image => image.node.image)

      this.setState({
        data: data.concat(loadedFiles),
        ...result.page_info,
      })
    } catch (err) {
      logError(err)
    }
  }

  onEndReached = () => {
    const { has_next_page: hasNextPage } = this.state
    if (hasNextPage) {
      this.getFiles(this.state.end_cursor)
    }
  }

  toggleSelection = file => {
    const { selectedFiles, selectedIndex, onSelect } = this.props
    const index = this.indexOfItem(file)

    if (index >= 0) {
      if (selectedIndex === index) {
        selectedFiles.splice(index, 1)
        const prevIndex = index || selectedFiles.length
        onSelect(selectedFiles, prevIndex - 1 || 0)
      } else {
        onSelect(selectedFiles, index)
      }
    } else if (MAX_SELECTED_FILES > selectedFiles.length) {
      const lastIndex = selectedFiles.push(file) - 1
      onSelect(selectedFiles, lastIndex)
    }
  }

  indexOfItem(item) {
    return findIndex(propEq('uri', item.uri))(this.props.selectedFiles)
  }

  renderFooterLoader = () => {
    if (this.state.hasNextPage) {
      return <ActivityIndicator color={this.state.activityIndicatorColor} />
    }

    return null
  }

  renderItem = ({ item }) => {
    const selectedIndex = this.indexOfItem(item)
    const isSelected = selectedIndex >= 0

    return (
      <MediaItem
        item={item}
        selected={isSelected}
        order={selectedIndex + 1}
        onPress={this.toggleSelection}
      />
    )
  }

  render() {
    const { data } = this.state

    return (
      <FlatList
        style={{ flex: 1 }}
        ListFooterComponent={this.renderFooterLoader}
        contentContainerStyle={{ padding: 3 }}
        numColumns={NUM_COLUMNS}
        initialNumToRender={PAGE_SIZE}
        onEndReached={this.onEndReached}
        renderItem={this.renderItem}
        keyExtractor={item => item.uri}
        data={data}
      />
    )
  }
}
