import React, { Component } from 'react'
import { CameraRoll, Platform, View, Text, FlatList, ActivityIndicator } from 'react-native'

import MediaItem from './Item'
import styles from './styles'

export default class MediaPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [],
      selected: this.props.selected,
      lastCursor: null,
      fetching: true,
      loadingMore: false,
      noMoreFiles: false,
      dataSource: [],
      activityIndicatorSize: 'small',
      activityIndicatorColor: '#000000',
    }
  }

  componentWillMount() {
    this.getFiles()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selected: nextProps.selected })
  }

  getFiles() {
    if (!this.state.loadingMore) {
      this.setState({ loadingMore: true }, () => {
        this.getCameraRollFiles()
      })
    }
  }

  getCameraRollFiles() {
    const { groupTypes, assetType, firstLimit } = this.props
    const fetchParams = {
      first: firstLimit !== undefined ? firstLimit : 1000,
      groupTypes,
      assetType,
    }

    if (Platform.OS === 'android') {
      delete fetchParams.groupTypes
    }

    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor
    }

    CameraRoll.getPhotos(fetchParams).then(data => this.appendFiles(data))
  }

  appendFiles(data) {
    const assets = data.edges
    const newState = {
      loadingMore: false,
      fetching: false,
    }

    if (!data.page_info.has_next_page) {
      newState.noMoreFiles = true
    }

    if (assets.length > 0) {
      newState.lastCursor = data.page_info.end_cursor
      newState.images = this.state.images.concat(assets)
      newState.dataSource = this.filterMediaRow(newState.images, this.props.itemsPerRow)
    }

    this.setState(newState)
  }

  renderLoaderStyle() {
    const props = this.props
    return {
      color:
        props.activityIndicatorColor !== undefined
          ? props.activityIndicatorColor
          : this.state.activityIndicatorColor,
      size:
        props.activityIndicatorSize !== undefined
          ? props.activityIndicatorSize
          : this.state.activityIndicatorSize,
    }
  }

  renderMediaItem(item) {
    const { selected } = this.state
    const { imageMargin, customSelectMarker, itemsPerRow, containerWidth } = this.props

    const { uri } = item.node.image
    const isSelected = this.existsInArray(selected, 'uri', uri) >= 0

    return (
      <MediaItem
        key={uri}
        item={item}
        selected={isSelected}
        imageMargin={imageMargin}
        customSelectMarker={customSelectMarker}
        itemsPerRow={itemsPerRow}
        containerWidth={containerWidth}
        onClick={this.selectMediaFile}
      />
    )
  }

  renderRow(rowData) {
    const items = rowData.map(item => {
      if (item === null) {
        return null
      }
      return this.renderMediaItem(item)
    })

    return <View style={styles.row}>{items}</View>
  }

  renderFooterLoader = () => {
    if (!this.state.noMoreFiles) {
      return <ActivityIndicator color={this.state.activityIndicatorColor} />
    }
    return null
  }

  onEndReached = () => {
    if (!this.state.noMoreFiles) {
      this.getFiles()
    }
  }

  selectMediaFile = item => {
    const { maximumSelectedFiles, itemsPerRow, onSelect, selectSingleItem } = this.props
    const selected = this.state.selected

    const index = this.existsInArray(selected, 'uri', item.image.uri)

    if (index >= 0) {
      selected.splice(index, 1)
    } else {
      if (selectSingleItem) {
        selected.splice(0, selected.length)
      }
      if (selected.length < maximumSelectedFiles) {
        selected.push(item)
      }
    }
    this.setState({
      selected,
      dataSource: this.filterMediaRow(this.state.images, itemsPerRow),
    })

    onSelect(selected, item)
  }

  filterMediaRow(files, numberOfRows) {
    const result = []

    let temp = []

    for (let i = 0; i < files.length; ++i) {
      if (i > 0 && i % numberOfRows === 0) {
        result.push(temp)
        temp = []
      }
      temp.push(files[i])
    }

    if (temp.length > 0) {
      while (temp.length !== numberOfRows) {
        temp.push(null)
      }
      result.push(temp)
    }

    return result
  }

  existsInArray(array, property, value) {
    return array.map(o => o.image[property]).indexOf(value)
  }

  render() {
    const { dataSource } = this.state
    const { batchSize, imageMargin, emptyGalleryText, emptyTextStyle, customLoader } = this.props

    if (this.state.fetching) {
      return (
        <View style={styles.loading}>
          {customLoader || (
            <ActivityIndicator
              size={this.renderLoaderStyle().size}
              color={this.renderLoaderStyle().color}
            />
          )}
        </View>
      )
    }

    return (
      <View style={[styles.wrapper, { padding: imageMargin }]}>
        {dataSource.length > 0 ? (
          <FlatList
            style={{ flex: 1 }}
            ListFooterComponent={this.renderFooterLoader}
            initialNumToRender={batchSize}
            onEndReached={this.onEndReached}
            renderItem={({ item }) => this.renderRow(item)}
            keyExtractor={(item, index) => item[0].node.image.uri + item[0].timestamp + index}
            data={dataSource}
            extraData={this.state.selected}
          />
        ) : (
          <Text style={[styles.emptyText, emptyTextStyle]}>{emptyGalleryText}</Text>
        )}
      </View>
    )
  }
}
