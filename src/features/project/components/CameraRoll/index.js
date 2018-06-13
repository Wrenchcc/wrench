import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CameraRoll as RNCameraRoll, FlatList, Dimensions } from 'react-native'
import { find, propEq } from 'ramda'
import { Touchable } from 'ui'
import { Base, Cell, Image, Overlay } from './styles'

const { width } = Dimensions.get('window')

const PAGE_SIZE = 10
const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

const removeByKey = (a, params) => {
  a.some((item, index) => (a[index][params.key] === params.value ? !!a.splice(index, 1) : false))
  return a
}

export default class CameraRoll extends Component {
  static propTypes = {
    pictures: PropTypes.array,
    addPictures: PropTypes.func.isRequired,
    closeDropdown: PropTypes.func.isRequired,
  }

  state = {
    images: [],
    end_cursor: null,
    has_next_page: true,
  }

  componentDidMount() {
    this.getpictures()
  }

  getpictures = async after => {
    const { images, has_next_page: hasNextPage } = this.state

    if (!hasNextPage) return

    const data = await RNCameraRoll.getPhotos({ first: PAGE_SIZE, after })
    const newImages = data.edges.map(image => image.node.image)

    this.setState({ images: images.concat(newImages), ...data.page_info })
  }

  // https://facebook.github.io/react-native/docs/flatlist.html#getitemlayout
  // getItemLayout is an optional optimization that let us skip measurement of
  // dynamic content if you know the height of items a priori.
  getItemLayout = (data, index) => ({ length: ITEM_SIZE, offset: ITEM_SIZE * index, index })

  toggleSelection = photo => {
    const { pictures, addPictures, closeDropdown } = this.props

    if (this.isAdded(photo)) {
      // TODO: Maybe change to object keys instead
      addPictures(removeByKey(pictures, {
        key: 'filename',
        value: photo.filename,
      }))

      return
    }

    addPictures(pictures.concat(photo))
    closeDropdown()
  }

  isAdded = ({ filename }) => !!find(propEq('filename', filename))(this.props.pictures)

  // TODO: Use styled component and fix selection in android
  renderItem = ({ item }) => (
    <Cell>
      <Touchable
        hapticFeedback="impactLight"
        onPress={() => this.toggleSelection(item)}
        style={{ background: 'rgba(255, 255, 255, 0.1)', margin: GUTTER / 2 }}
      >
        <Overlay selected={this.isAdded(item)} />

        <Image
          placeholderColor="transparent"
          disableAnimation
          selected={this.isAdded(item)}
          source={{ uri: item.uri }}
          height={ITEM_SIZE}
        />
      </Touchable>
    </Cell>
  )

  render = () => (
    <Base onPressIn={this.props.closeDropdown} activeOpacity={1}>
      <FlatList
        initialNumToRender={PAGE_SIZE}
        getItemLayout={this.getItemLayout}
        removeClippedSubviews
        contentContainerStyle={{ padding: 5 }}
        numColumns={2}
        data={this.state.images}
        keyExtractor={item => item.uri}
        onEndReached={() => this.getpictures(this.state.end_cursor)}
        renderItem={this.renderItem}
      />
    </Base>
  )
}
