import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CameraRoll, FlatList, View, ActivityIndicator } from 'react-native'
import Permissions from 'react-native-permissions'
import { findIndex, propEq, find, omit, pathOr } from 'ramda'
import { logError } from 'utils/analytics'
import AskForPermission from 'features/project/components/AskForPermission'
import MediaItem from './Item'

const AUTHORIZED = 'authorized'
const PHOTO_PERMISSION = 'photo'
const MAX_SELECTED_FILES = 10
const NEW_CAMERA_FILE = 'new_camera_file'
const NUM_COLUMNS = 4
const PAGE_SIZE = 64

export default class MediaPicker extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedFiles: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number,
  }

  static getDerivedStateFromProps(props, state) {
    const newItem = find(propEq(NEW_CAMERA_FILE, true), props.selectedFiles)

    if (newItem && newItem.uri !== pathOr(false, ['data', 0, 'uri'], state)) {
      return {
        data: [omit([NEW_CAMERA_FILE], newItem), ...state.data],
      }
    }

    return state
  }

  state = {
    data: [],
    end_cursor: null,
    has_next_page: true,
    isLoading: true,
  }

  constructor(props) {
    super(props)
    this.checkPhotoPermission()
  }

  checkPhotoPermission = () => {
    Permissions.check(PHOTO_PERMISSION).then(response => {
      if (response === AUTHORIZED) {
        this.getFiles()
      }
      this.setState({
        isLoading: false,
        photoPermission: response,
      })
    })
  }

  permissionAuthorized = () => {
    this.setState({ photoPermission: AUTHORIZED })
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

  indexOfItem(item) {
    return findIndex(propEq('uri', item.uri))(this.props.selectedFiles)
  }

  render() {
    const { data, photoPermission, isLoading } = this.state

    if (isLoading) return null

    if (photoPermission !== AUTHORIZED) {
      return (
        <AskForPermission permission={PHOTO_PERMISSION} onSuccess={this.permissionAuthorized} />
      )
    }

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
