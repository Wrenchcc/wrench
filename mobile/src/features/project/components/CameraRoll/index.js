import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CameraRoll as RNCameraRoll, FlatList } from 'react-native'
import Permissions from 'react-native-permissions'
import { hasIn, omit } from 'ramda'
import { Touchable } from 'ui'
import { logError } from 'utils/analytics'
import AskForPermission from '../AskForPermission'
import { Base, Cell, Image, Overlay, GUTTER, ITEM_SIZE } from './styles'

const PERMISSION = 'photo'
const AUTHORIZED = 'authorized'
const PAGE_SIZE = 10

export default class CameraRoll extends PureComponent {
  static propTypes = {
    closeDropdown: PropTypes.func.isRequired,
  }

  state = {
    isLoading: true,
    images: [],
    end_cursor: null,
    has_next_page: true,
    photoPermission: false,
    selectedFiles: {},
    addedFiles: [],
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

  onEndReached = ({ distanceFromEnd }) => {
    const { has_next_page: hasNextPage } = this.state
    if (hasNextPage && distanceFromEnd > 0) {
      this.getpictures(this.state.end_cursor)
    }
  }

  getpictures = async after => {
    const { images, has_next_page: hasNextPage } = this.state
    if (!hasNextPage) return

    try {
      const data = await RNCameraRoll.getPhotos({ first: PAGE_SIZE, after })
      const newImages = data.edges.map(image => image.node.image)

      this.setState({ images: images.concat(newImages), ...data.page_info })
    } catch (err) {
      logError(err)
    }
  }

  getItemLayout = (data, index) => ({ length: ITEM_SIZE, offset: ITEM_SIZE * index, index })

  enablePermission = () => {
    this.getpictures()
    this.setState({ photoPermission: true })
  }

  addSelectedFile = file => {
    this.setState(
      prevState => ({
        selectedFiles: { ...prevState.selectedFiles, [file.filename]: file },
      }),
      this.addCroppedFile
    )
  }

  removeSelectedFile = file => {
    this.setState(prevState => ({
      selectedFiles: omit([file.filename], prevState.selectedFiles),
    }))
  }

  addCroppedFile = () => {}

  toggleSelection = file => {
    const { closeDropdown } = this.props

    closeDropdown()

    if (this.isSelected(file)) {
      return this.removeSelectedFile(file)
    }

    return this.addSelectedFile(file)
  }

  isSelected = ({ filename }) => hasIn(filename, this.state.selectedFiles)

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
        getItemLayout={this.getItemLayout}
        removeClippedSubviews
        contentContainerStyle={{ padding: GUTTER }}
        numColumns={2}
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
      component = this.renderCameraRoll()
    } else {
      component = <AskForPermission permission={PERMISSION} onSuccess={this.enablePermission} />
    }

    return (
      <Base onPressIn={this.props.closeDropdown} activeOpacity={1} paddingTop={photoPermission}>
        {component}
      </Base>
    )
  }
}
