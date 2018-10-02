import React, { PureComponent } from 'react'
import { CameraRoll as RNCameraRoll, FlatList } from 'react-native'
import { hasIn, omit } from 'ramda'
import { Touchable } from 'ui'
import { logError } from 'utils/analytics'
import { Base, Cell, Image, Overlay, GUTTER } from './styles'

const PAGE_SIZE = 16

export default class CameraRoll extends PureComponent {
  state = {
    end_cursor: null,
    files: [],
    has_next_page: true,
    selectedFiles: {},
  }

  componentDidMount() {
    this.getpictures()
  }

  getpictures = async after => {
    const { files, has_next_page: hasNextPage } = this.state

    if (!hasNextPage) return

    try {
      const data = await RNCameraRoll.getPhotos({ first: PAGE_SIZE, after })
      const newImages = data.edges.map(image => image.node.image)

      this.setState({
        files: files.concat(newImages),
        ...data.page_info,
      })
    } catch (err) {
      logError(err)
    }
  }

  addSelectedFile = file => {
    this.setState(prevState => ({
      currentFile: file,
      selectedFiles: { ...prevState.selectedFiles, [file.filename]: file },
    }))
  }

  removeSelectedFile = ({ filename }) => {
    const { selectedFiles } = this.state
    const fileKeys = Object.keys(selectedFiles)
    const index = fileKeys.indexOf(filename)

    const prevFilename = fileKeys[index - 1 > 0 ? index - 1 : 0]
    this.setState({ currentFile: selectedFiles[prevFilename] })

    this.setState(prevState => ({
      selectedFiles: omit([filename], prevState.selectedFiles),
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
      this.getpictures(this.state.end_cursor)
    }
  }

  isSelected = ({ filename }) => hasIn(filename, this.state.selectedFiles)

  renderItem = ({ item }) => (
    <Cell>
      <Touchable hapticFeedback="impactLight" onPress={() => this.toggleSelection(item)}>
        <Overlay selected={this.isSelected(item)} />
        <Image source={{ uri: item.uri }} />
      </Touchable>
    </Cell>
  )

  render() {
    return (
      <Base>
        <FlatList
          initialNumToRender={PAGE_SIZE}
          contentContainerStyle={{
            paddingBottom: GUTTER,
            paddingLeft: GUTTER / 2,
            paddingRight: GUTTER / 2,
          }}
          numColumns={4}
          data={this.state.files}
          keyExtractor={item => item.uri}
          onEndReached={this.onEndReached}
          renderItem={this.renderItem}
        />
      </Base>
    )
  }
}
