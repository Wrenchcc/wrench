import React, { Component } from 'react'
import { CameraRoll as RNCameraRoll, FlatList } from 'react-native'
import { Touchable } from 'ui'
import { logError } from 'utils/analytics'
import { Item, Image, Overlay, GUTTER, COLUMNS } from './styles'

const PAGE_SIZE = 16

export default class CameraRoll extends Component {
  state = {
    data: [],
    end_cursor: null,
    has_next_page: true,
    selected: [],
  }

  componentDidMount() {
    this.getPhotos()
  }

  arrayObjectIndexOf = (array, property, value) => array.map(o => o[property]).indexOf(value)

  getPhotos = async after => {
    const { data, has_next_page: hasNextPage } = this.state

    if (!hasNextPage) return

    try {
      const result = await RNCameraRoll.getPhotos({ first: PAGE_SIZE, after })
      const loadedImages = result.edges.map(image => image.node.image)

      this.setState({
        data: data.concat(loadedImages),
        ...result.page_info,
      })
    } catch (err) {
      logError(err)
    }
  }

  onEndReached = () => {
    const { has_next_page: hasNextPage } = this.state
    if (hasNextPage) {
      this.getPhotos(this.state.end_cursor)
    }
  }

  isSelected = ({ uri }) => this.arrayObjectIndexOf(this.state.selected, 'uri', uri) >= 0

  selectFile = file => {
    const { selected } = this.state
    const index = this.arrayObjectIndexOf(selected, 'uri', file.uri)

    if (index >= 0) {
      selected.splice(index, 1)
    } else {
      selected.push(file)
    }

    this.setState({ selected })
  }

  renderItem = ({ item }) => (
    <Item>
      <Touchable onPress={() => this.selectFile(item)}>
        <Overlay selected={this.isSelected(item)} />
        <Image source={{ uri: item.uri }} />
      </Touchable>
    </Item>
  )

  render() {
    return (
      <FlatList
        initialNumToRender={PAGE_SIZE}
        contentContainerStyle={{
          paddingBottom: GUTTER,
          paddingLeft: GUTTER / 2,
          paddingRight: GUTTER / 2,
        }}
        numColumns={COLUMNS}
        data={this.state.data}
        keyExtractor={item => item.uri}
        onEndReached={this.onEndReached}
        renderItem={this.renderItem}
      />
    )
  }
}
