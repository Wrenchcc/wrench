import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, View, ActivityIndicator, Platform } from 'react-native'
import { check, IOS_PERMISSIONS, RESULTS } from 'react-native-permissions'
import { findIndex, propEq, find, omit, pathOr } from 'ramda'
import { logError } from 'utils/analytics'
import AskForPermission from 'features/project/components/AskForPermission'
import GalleryManager from 'react-native-gallery-manager'
import MediaItem from './Item'

const MAX_SELECTED_FILES = 10
const NEW_CAMERA_FILE = 'new_camera_file'
const NUM_COLUMNS = 4
const PAGE_SIZE = 64
const ASSET_TYPE = 'image'

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
    hasMore: true,
    isLoading: true,
  }

  constructor(props) {
    super(props)

    if (Platform.OS === 'ios') {
      this.checkPhotoPermission()
    }
  }

  checkPhotoPermission = () => {
    check(IOS_PERMISSIONS.PHOTO_LIBRARY).then(response => {
      if (response === RESULTS.GRANTED) {
        this.getFiles()
      }
      this.setState({
        isLoading: false,
        photoPermission: response,
      })
    })
  }

  permissionAuthorized = () => {
    this.setState({ photoPermission: RESULTS.GRANTED }, this.getFiles)
  }

  getFiles = async after => {
    const { data, hasMore } = this.state
    if (!hasMore) return

    try {
      const result = await GalleryManager.getAssets({
        type: ASSET_TYPE,
        startFrom: after,
        limit: PAGE_SIZE,
      })

      this.setState({
        hasMore: result.hasMore,
        data: data.concat(result.assets),
      })
    } catch (err) {
      logError(err)
    }
  }

  onEndReached = ({ distanceFromEnd }) => {
    if (this.state.hasMore && distanceFromEnd > 0) {
      this.getFiles(this.state.data.length)
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
    if (this.state.hasMore) {
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
        onPress={this.toggleSelection}
        order={selectedIndex + 1}
        selected={isSelected}
      />
    )
  }

  indexOfItem(item) {
    return findIndex(propEq('uri', item.uri))(this.props.selectedFiles)
  }

  render() {
    const { data, photoPermission, isLoading } = this.state

    if (isLoading) return null

    if (photoPermission !== RESULTS.GRANTED) {
      return (
        <AskForPermission
          permission={IOS_PERMISSIONS.PHOTO_LIBRARY}
          onSuccess={this.permissionAuthorized}
        />
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
        style={{ flex: 1 }}
      />
    )
  }
}
