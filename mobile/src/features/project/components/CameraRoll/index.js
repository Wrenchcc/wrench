import React, { PureComponent, Fragment } from 'react'
import { CameraRoll as RNCameraRoll, FlatList, ImageEditor } from 'react-native'
import Permissions from 'react-native-permissions'
import { hasIn, omit } from 'ramda'
import { Touchable } from 'ui'
import { logError } from 'utils/analytics'
import AskForPermission from '../AskForPermission'
import { Base, Placeholder, Cell, Image, Overlay, GUTTER, SQUARE_SIZE } from './styles'
import Cropper from './Cropper'

const AUTHORIZED = 'authorized'
const PAGE_SIZE = 10
const PERMISSION = 'photo'

export default class CameraRoll extends PureComponent {
  state = {
    end_cursor: null,
    has_next_page: true,
    images: [],
    isLoading: true,
    photoPermission: false,
    selectedFiles: {},
    selectedImage: null,
  }

  componentDidMount() {
    Permissions.check(PERMISSION).then(res => {
      this.setState({ isLoading: false })
      if (res === AUTHORIZED) {
        this.enablePermission()
        this.getpictures()
      }
    })
  }

  enablePermission = () => {
    this.getpictures()
    this.setState({ photoPermission: true })
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
      logError(err)
    }
  }

  addSelectedFile = file => {
    this.setState(
      prevState => ({
        selectedImage: file,
        selectedFiles: { ...prevState.selectedFiles, [file.filename]: file },
      })
      // async () => {
      // const result = await cropImage(file.uri)
      // this.props.addFileToPost({ ...result, originalFilename: file.filename })
      // }
    )
  }

  removeSelectedFile = ({ filename }) => {
    const { selectedFiles } = this.state
    const fileKeys = Object.keys(selectedFiles)
    const index = fileKeys.indexOf(filename)

    const prevFilename = fileKeys[index - 1 > 0 ? index - 1 : 0]
    this.setState({ selectedImage: selectedFiles[prevFilename] })

    this.setState(
      prevState => ({
        selectedFiles: omit([filename], prevState.selectedFiles),
      })
      // () => {
      //   this.props.removeFileFromPost(filename)
      // }
    )
  }

  toggleSelection = file => {
    const { closeDropdown } = this.props

    closeDropdown()

    if (this.isSelected(file)) {
      return this.removeSelectedFile(file)
    }

    return this.addSelectedFile(file)
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

  isSelected = ({ filename }) => hasIn(filename, this.state.selectedFiles)

  // transformData: {}

  renderImageCropper() {
    if (!this.state.selectedImage) return null

    return (
      <Cropper
        image={this.state.selectedImage}
        size={{ width: SQUARE_SIZE, height: SQUARE_SIZE }}
        onCropping={this.setTransformData}
      />
    )
  }

  renderItem = ({ item }) => {
    const selected = this.isSelected(item)

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
          paddingBottom: GUTTER,
          paddingLeft: GUTTER / 2,
          paddingRight: GUTTER / 2,
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
    const { photoPermission, isLoading } = this.state

    if (isLoading) return null

    let component

    if (photoPermission) {
      component = (
        <Fragment>
          <Placeholder>{this.renderImageCropper()}</Placeholder>
          {this.renderCameraRoll()}
        </Fragment>
      )
    } else {
      component = <AskForPermission permission={PERMISSION} onSuccess={this.enablePermission} />
    }

    return <Base>{component}</Base>
  }
}
