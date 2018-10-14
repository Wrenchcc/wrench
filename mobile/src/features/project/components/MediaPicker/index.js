import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CameraRoll, FlatList, ActivityIndicator } from 'react-native'
import { findIndex, propEq } from 'ramda'
import { logError } from 'utils/analytics'
import MediaItem from './Item'

const PAGE_SIZE = 64
const MAX_SELECTED_FILES = 10
const NUM_COLUMNS = 4

export default class MediaPicker extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedFiles: PropTypes.array.isRequired,
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
    const { selectedFiles } = this.props
    const index = this.indexOfItem(file)
    const prevFile = selectedFiles[index - 1]
    const isSelected = index >= 0

    if (isSelected || (prevFile && prevFile.filename === file.filename)) {
      selectedFiles.splice(index, 1)
    } else if (!isSelected && MAX_SELECTED_FILES > selectedFiles.length) {
      selectedFiles.push(file)
    }

    this.props.onSelect(selectedFiles, this.indexOfItem(file))
  }

  indexOfItem(item) {
    const { selectedFiles } = this.props
    return findIndex(propEq('uri', item.uri))(selectedFiles)
  }

  renderFooterLoader = () => {
    if (this.state.hasNextPage) {
      return <ActivityIndicator color={this.state.activityIndicatorColor} />
    }

    return null
  }

  renderItem = ({ item }) => {
    const index = this.indexOfItem(item)
    const isSelected = index >= 0

    return (
      <MediaItem
        item={item}
        selected={isSelected}
        order={index + 1}
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
