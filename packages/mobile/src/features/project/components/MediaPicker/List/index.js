import React, { Component } from 'react'
import { CameraRoll, FlatList, View, ActivityIndicator } from 'react-native'
import { logError } from 'utils/analytics'
import MediaItem from '../Item'

const NUM_COLUMNS = 4
const PAGE_SIZE = 40
const ASSET_TYPE = 'Photos'

class List extends Component {
  state = {
    data: [],
    end_cursor: null,
    has_next_page: true,
  }

  constructor(props) {
    super(props)

    this.getFiles()
  }

  getFiles = async after => {
    const { data, has_next_page: hasNextPage } = this.state
    if (!hasNextPage) return
    console.log(this.props.groupType)
    try {
      const result = await CameraRoll.getPhotos({
        after,
        first: PAGE_SIZE,
        groupTypes: this.props.groupType,
        assetType: ASSET_TYPE,
      })

      const loadedFiles = result.edges.map(image => image.node.image)
      this.setState({
        data: data.concat(loadedFiles),
        ...result.page_info,
      })
    } catch (err) {
      logError(err)
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
    const selectedIndex = -1 // this.indexOfItem(item)
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

  onEndReached = () => {
    const { has_next_page: hasNextPage } = this.state
    if (hasNextPage) {
      this.getFiles(this.state.end_cursor)
    }
  }

  render() {
    const { data } = this.state

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

export default List
