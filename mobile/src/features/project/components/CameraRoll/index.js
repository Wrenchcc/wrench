import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CameraRoll as RNCameraRoll, FlatList } from 'react-native'
import Permissions from 'react-native-permissions'
import { hasIn, omit } from 'ramda'
import AskForPermission from 'features/project/components/AskForPermission'
import { Touchable } from 'ui'
import { logError } from 'utils/analytics'
import { Item, Image, Overlay, GUTTER, COLUMNS } from './styles'

const PHOTO_PERMISSION = 'photo'
const AUTHORIZED = 'authorized'
const PAGE_SIZE = 16

export default class CameraRoll extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
  }

  state = {
    data: [],
    end_cursor: null,
    has_next_page: true,
    isLoading: true,
    lastSelected: null,
    photoPermission: false,
    selectedFiles: {},
  }

  constructor(props) {
    super(props)
    this.checkCameraPermission()
  }

  get prevFile() {
    const { selectedFiles } = this.state
    return selectedFiles[Object.keys(selectedFiles)[Object.keys(selectedFiles).length - 1]]
  }

  checkCameraPermission = () => {
    Permissions.check(PHOTO_PERMISSION).then(response => {
      if (response === AUTHORIZED) {
        this.getFiles()
      }
      this.setState({
        isLoading: false,
        photoPermission: response,
      })
    })
  }

  permissionAuthorized = () => {
    this.setState({ photoPermission: AUTHORIZED })
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
      selectedFiles: { ...prevState.selectedFiles, [file.filename]: file },
    }))
  }

  removeSelectedFile = ({ filename }) => {
    this.setState(
      prevState => ({
        selectedFiles: omit([filename], prevState.selectedFiles),
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

  isSelected = ({ filename }) => hasIn(filename, this.state.selectedFiles)

  renderItem = ({ item }) => (
    <Item>
      <Touchable onPress={() => this.toggleSelection(item)} activeOpacity={1}>
        <Overlay selected={this.isSelected(item)} />
        <Image source={{ uri: item.uri }} />
      </Touchable>
    </Item>
  )

  render() {
    const { photoPermission, isLoading } = this.state

    if (isLoading) return null

    if (photoPermission !== AUTHORIZED) {
      return (
        <AskForPermission permission={PHOTO_PERMISSION} onSuccess={this.permissionAuthorized} />
      )
    }
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
