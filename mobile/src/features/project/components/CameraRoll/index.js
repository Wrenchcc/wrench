import React, { Component } from 'react'
import { CameraRoll as RNCameraRoll, FlatList, ImageEditor } from 'react-native'
import { Touchable } from 'ui'
import { Base, Placeholder, Cell, Image, Overlay, GUTTER } from './styles'
import Cropper from './Cropper'

const PAGE_SIZE = 20

export default class CameraRoll extends Component {
  state = {
    // isLoading: true,
    // photoPermission: false,
    // selectedFiles: {},
    croppedImage: null,
    end_cursor: null,
    has_next_page: true,
    images: [],
    selectedImage: null,
  }

  constructor(props) {
    super(props)

    this.getpictures()
  }

  getpictures = async after => {
    const { images, has_next_page: hasNextPage, selectedImage } = this.state

    if (!hasNextPage) return

    try {
      const data = await RNCameraRoll.getPhotos({ first: PAGE_SIZE, after })
      const newImages = data.edges.map(image => image.node.image)

      if (!selectedImage) {
        this.setState({ selectedImage: data.edges[0].node.image })
      }

      this.setState({
        images: images.concat(newImages),
        ...data.page_info,
      })
    } catch (err) {
      // logError(err)
    }
  }

  // crop = () => {
  //   ImageEditor.cropImage(
  //     this.state.image.uri,
  //     this.transformData,
  //     croppedImage => this.setState({ croppedImage }),
  //     () => null
  //   )
  // }

  setTransformData = data => {
    this.transformData = data
  }

  onEndReached = ({ distanceFromEnd }) => {
    const { has_next_page: hasNextPage } = this.state
    if (hasNextPage && distanceFromEnd > 0) {
      this.getpictures(this.state.end_cursor)
    }
  }

  transformData: {}

  renderImageCropper() {
    if (!this.state.selectedImage) return null

    return (
      <Cropper
        image={this.state.selectedImage}
        size={{ width: 375, height: 375 }}
        style={{ width: 375, height: 375 }}
        onTransformDataChange={this.setTransformData}
      />
    )
  }

  renderCroppedImage() {
    return (
      <Placeholder source={{ uri: this.state.croppedImage }} style={{ width: 375, height: 375 }} />
    )
  }

  renderItem = ({ item }) => {
    const selected = false // this.isSelected(item)

    return (
      <Cell>
        <Touchable hapticFeedback="impactLight" onPress={() => this.toggleSelection(item)}>
          <Overlay selected={selected} />
          <Image selected={selected} source={{ uri: item.uri }} />
        </Touchable>
      </Cell>
    )
  }

  renderCameraRoll() {
    return (
      <FlatList
        initialNumToRender={PAGE_SIZE}
        contentContainerStyle={{
          paddingTop: GUTTER * 2,
          paddingBottom: GUTTER * 2,
          paddingLeft: GUTTER * 2,
          paddingRight: GUTTER * 2,
        }}
        numColumns={4}
        data={this.state.images}
        keyExtractor={item => item.uri}
        onEndReached={this.onEndReached}
        renderItem={this.renderItem}
      />
    )
  }

  render() {
    return (
      <Base>
        {!this.state.croppedImage ? this.renderImageCropper() : this.renderCroppedImage()}
        {this.renderCameraRoll()}
      </Base>
    )
  }
}
