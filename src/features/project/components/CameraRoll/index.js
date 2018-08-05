import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CameraRoll as RNCameraRoll, FlatList, Dimensions } from 'react-native'
import Permissions from 'react-native-permissions'
import { find, propEq } from 'ramda'
import { Touchable } from 'ui'
import AskForPermission from '../AskForPermission'
import { Base, Cell, Image, Overlay } from './styles'

const { width } = Dimensions.get('window')

const PERMISSION = 'photo'
const AUTHORIZED = 'authorized'
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
    photoPermission: false,
  }

  componentDidMount() {
    Permissions.check(PERMISSION).then(res => {
      if (res === AUTHORIZED) {
        this.enablePermission()
        this.getpictures()
      }
    })
  }

  onEndReached = ({ distanceFromEnd }) => {
    const { has_next_page: hasNextPage } = this.state
    if (hasNextPage && distanceFromEnd > 0) {
      this.getpictures(this.state.end_cursor)
    }
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

  enablePermission = () => {
    this.getpictures()
    this.setState({ photoPermission: true })
  }

  toggleSelection = photo => {
    const { pictures, addPictures, closeDropdown } = this.props

    if (this.isAdded(photo)) {
      // TODO: Maybe change to object keys instead
      addPictures(
        removeByKey(pictures, {
          key: 'filename',
          value: photo.filename,
        })
      )

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
        style={{ margin: GUTTER / 2 }}
      >
        <Overlay selected={this.isAdded(item)} />
        <Image selected={this.isAdded(item)} source={{ uri: item.uri }} height={ITEM_SIZE} />
      </Touchable>
    </Cell>
  )

  renderCameraRoll = () => (
    <FlatList
      initialNumToRender={PAGE_SIZE}
      getItemLayout={this.getItemLayout}
      removeClippedSubviews
      contentContainerStyle={{ padding: 5 }}
      numColumns={2}
      data={this.state.images}
      keyExtractor={item => item.uri}
      onEndReached={this.onEndReached}
      renderItem={this.renderItem}
    />
  )

  render() {
    const { photoPermission } = this.state
    return (
      <Base onPressIn={this.props.closeDropdown} activeOpacity={1} paddingTop={photoPermission}>
        {photoPermission ? (
          this.renderCameraRoll()
        ) : (
          <AskForPermission permission={PERMISSION} onSuccess={this.enablePermission} />
        )}
      </Base>
    )
  }
}
