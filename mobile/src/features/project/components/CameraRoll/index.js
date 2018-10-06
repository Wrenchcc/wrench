import React, { PureComponent } from 'react'
import { CameraRoll as RNCameraRoll, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { hasIn, omit } from 'ramda'
import { Touchable } from 'ui'
import { logError } from 'utils/analytics'
import { Item, Image, Overlay, GUTTER, COLUMNS } from './styles'

const PAGE_SIZE = 16

export default class CameraRoll extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
  }

  state = {
    data: [],
    end_cursor: null,
    has_next_page: true,
    lastSelected: null,
    selected: {},
  }

  componentDidMount() {
    this.getFiles()
  }

  get prevFile() {
    const { selected } = this.state
    return selected[Object.keys(selected)[Object.keys(selected).length - 1]]
  }

  getFiles = async after => {
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
    this.props.onSelect(file)
    this.setState(prevState => ({
      selected: { ...prevState.selected, [file.filename]: file },
    }))
  }

  removeSelectedFile = ({ filename }) => {
    this.setState(
      prevState => ({
        selected: omit([filename], prevState.selected),
      }),
      () => {
        this.props.onSelect(this.prevFile)
      }
    )
  }

  toggleSelection = file => {
    this.setState({ lastSelected: file })

    if (this.isSelected(file)) {
      if (
        this.state.lastSelected.filename === file.filename
        || this.prevFile.filename === file.filename
      ) {
        return this.removeSelectedFile(file)
      }

      this.props.onSelect(file)
    }

    return this.addSelectedFile(file)
  }

  onEndReached = () => {
    const { has_next_page: hasNextPage } = this.state
    if (hasNextPage) {
      this.getFiles(this.state.end_cursor)
    }
  }

  isSelected = ({ filename }) => hasIn(filename, this.state.selected)

  renderItem = ({ item }) => (
    <Item>
      <Touchable onPress={() => this.toggleSelection(item)} activeOpacity={1}>
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
