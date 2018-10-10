import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CameraRoll, FlatList, ActivityIndicator } from 'react-native'
import { logError } from 'utils/analytics'
import MediaItem from './Item'

const PAGE_SIZE = 64
const MAX_SELECTED_FIELES = 10
const NUM_COLUMNS = 4

function existsInArray(array, property, value) {
  return array.map(o => o[property]).indexOf(value)
}

export default class MediaPicker extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
  }

  state = {
    data: [],
    end_cursor: null,
    has_next_page: true,
    selectedFiles: [],
    lastSelected: null,
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
    this.setState({ lastSelected: file })

    const { selectedFiles, lastSelected } = this.state
    const index = existsInArray(selectedFiles, 'uri', file.uri)

    if (index >= 0) {
      console.log(lastSelected.filename, file.filename)

      selectedFiles.splice(index, 1)
    } else if (MAX_SELECTED_FIELES > selectedFiles.length) {
      selectedFiles.push(file)
    }

    this.setState({ selectedFiles })
    this.props.onSelect(selectedFiles)
  }

  renderFooterLoader = () => {
    if (this.state.hasNextPage) {
      return <ActivityIndicator color={this.state.activityIndicatorColor} />
    }

    return null
  }

  renderItem = ({ item }) => {
    const { selectedFiles } = this.state
    const index = existsInArray(selectedFiles, 'uri', item.uri)
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
