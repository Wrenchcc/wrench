import React, { PureComponent } from 'react'
import { CameraRoll as RNCameraRoll, FlatList } from 'react-native'
import { hasIn, omit } from 'ramda'
import { Touchable } from 'ui'
import { logError } from 'utils/analytics'
import { Item, Image, Overlay, GUTTER, COLUMNS } from './styles'

const PAGE_SIZE = 16

export default class CameraRoll extends PureComponent {
  state = {
    data: [],
    end_cursor: null,
    has_next_page: true,
    selectedImages: {},
  }

  componentDidMount() {
    this.getImages()
  }

  getImages = async after => {
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

  addSelectedFile = file => {
    this.setState(prevState => ({
      // currentImage: file,
      selectedImages: { ...prevState.selectedImages, [file.filename]: file },
    }))
  }

  removeSelectedFile = ({ filename }) => {
    // const { selectedImages } = this.state
    // const fileKeys = Object.keys(selectedImages)
    // const index = fileKeys.indexOf(filename)

    // const prevFilename = fileKeys[index - 1 > 0 ? index - 1 : 0]
    // this.setState({ currentImage: selectedImages[prevFilename] })

    this.setState(prevState => ({
      selectedImages: omit([filename], prevState.selectedImages),
    }))
  }

  toggleSelection = file => {
    if (this.isSelected(file)) {
      return this.removeSelectedFile(file)
    }

    return this.addSelectedFile(file)
  }

  onEndReached = ({ distanceFromEnd }) => {
    const { has_next_page: hasNextPage } = this.state
    if (hasNextPage && distanceFromEnd > 0) {
      this.getImages(this.state.end_cursor)
    }
  }

  isSelected = ({ filename }) => hasIn(filename, this.state.selectedImages)

  renderItem = ({ item }) => (
    <Item>
      <Touchable hapticFeedback="impactLight" onPress={() => this.toggleSelection(item)}>
        <Overlay selectedImages={this.isSelected(item)} />
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
