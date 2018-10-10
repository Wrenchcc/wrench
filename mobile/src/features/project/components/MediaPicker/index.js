import React, { Component } from 'react'
import { CameraRoll, Platform, View, FlatList, ActivityIndicator } from 'react-native'
import { last } from 'ramda'
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
      data: [],
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

  onEndReached = () => {
    if (!this.state.noMoreFiles) {
      this.getFiles()
    }
  }

  selectMediaFile = item => {
    const { maximumSelectedFiles, onSelect } = this.props
    const selected = this.state.selected

    const index = this.existsInArray(selected, 'uri', item.image.uri)

    // && last(selected).image.filename === item.image.filename
    if (index >= 0) {
      selected.splice(index, 1)
    }

    if (maximumSelectedFiles > selected.length) {
      selected.push(item)
    }

    this.setState({
      selected,
      data: this.filterMediaRow(this.state.images),
    })

    onSelect(selected, item)
  }

  existsInArray = (array, property, value) => array.map(o => o.image[property]).indexOf(value)

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
      newState.data = this.filterMediaRow(newState.images)
    }

    this.setState(newState)
  }

  renderFooterLoader = () => {
    if (!this.state.noMoreFiles) {
      return <ActivityIndicator color={this.state.activityIndicatorColor} />
    }
    return null
  }

  filterMediaRow(files) {
    const result = []

    let temp = []

    for (let i = 0; i < files.length; ++i) {
      if (i > 0 && i % 4 === 0) {
        result.push(temp)
        temp = []
      }
      temp.push(files[i])
    }

    if (temp.length > 0) {
      while (temp.length !== 4) {
        temp.push(null)
      }
      result.push(temp)
    }

    return result
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

  renderMediaItem(item) {
    const { selected } = this.state
    const { uri } = item.node.image
    const index = this.existsInArray(selected, 'uri', uri)
    const isSelected = index >= 0
    const order = index + 1

    return (
      <MediaItem
        key={uri}
        item={item}
        selected={isSelected}
        order={order}
        onPress={this.selectMediaFile}
      />
    )
  }

  keyExtractor = (item, index) => item[0].node.image.uri + item[0].timestamp + index

  render() {
    const { data } = this.state
    const { batchSize, emptyGalleryText, emptyTextStyle } = this.props

    if (this.state.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color="white" />
        </View>
      )
    }

    return (
      <View style={[styles.wrapper, { padding: 3 }]}>
        <FlatList
          style={{ flex: 1 }}
          ListFooterComponent={this.renderFooterLoader}
          initialNumToRender={batchSize}
          onEndReached={this.onEndReached}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={this.keyExtractor}
          data={data}
          extraData={this.state.selected}
        />
      </View>
    )
  }
}
