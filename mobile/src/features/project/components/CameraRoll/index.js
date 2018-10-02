import React, { PureComponent } from 'react'
import { CameraRoll as RNCameraRoll, FlatList } from 'react-native'
import { hasIn, omit } from 'ramda'
import { Touchable } from 'ui'
import { logError } from 'utils/analytics'
import { Base, Cell, Image, Overlay, GUTTER, COLUMNS } from './styles'

const PAGE_SIZE = 16

export default class CameraRoll extends PureComponent {
  state = {
    data: [],
    end_cursor: null,
    has_next_page: true,
    selected: {},
  }

  componentDidMount() {
    this.loadFiles()
  }

  loadFiles = async after => {
    const { data, has_next_page: hasNextPage } = this.state

    if (!hasNextPage) return

    try {
      const result = await RNCameraRoll.getPhotos({ first: PAGE_SIZE, after })
      const loadedFiles = result.edges.map(image => image.node.image)

      this.setState({
        data: data.concat(loadedFiles),
        ...result.page_info,
      })
    } catch (err) {
      logError(err)
    }
  }

  addSelectedFile = file => {
    this.setState(prevState => ({
      current: file,
      selected: { ...prevState.selected, [file.filename]: file },
    }))
  }

  removeSelectedFile = ({ filename }) => {
    const { selected } = this.state
    const fileKeys = Object.keys(selected)
    const index = fileKeys.indexOf(filename)

    const prevFilename = fileKeys[index - 1 > 0 ? index - 1 : 0]
    this.setState({ current: selected[prevFilename] })

    this.setState(prevState => ({
      selected: omit([filename], prevState.selected),
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
      this.loadFiles(this.state.end_cursor)
    }
  }

  isSelected = ({ filename }) => hasIn(filename, this.state.selected)

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
          numColumns={COLUMNS}
          data={this.state.data}
          keyExtractor={item => item.uri}
          onEndReached={this.onEndReached}
          renderItem={this.renderItem}
        />
      </Base>
    )
  }
}
