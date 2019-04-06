import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'
import { check, IOS_PERMISSIONS, ANDROID_PERMISSIONS, RESULTS } from 'react-native-permissions'
import BottomSheet from 'reanimated-bottom-sheet'
import withTranslation from 'i18n/withTranslation'
import { findIndex, propEq } from 'ramda'
import AskForPermission from 'features/project/components/AskForPermission'
import Albums from './Albums'
import OpenAlbum from './OpenAlbum'
import List from './List'

const PERMISSION = Platform.OS === 'ios' ? IOS_PERMISSIONS.PHOTO_LIBRARY : ANDROID_PERMISSIONS.READ_EXTERNAL_STORAGE

const MAX_SELECTED_FILES = 10

class MediaPicker extends PureComponent {
  static propTypes = {
    cameraFile: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
    selectedFiles: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.bottomSheetRef = React.createRef()

    this.state = {
      album: null,
      checkingPermission: true,
    }

    this.checkPhotoPermission()
  }

  checkPhotoPermission = () => {
    check(PERMISSION).then(response => {
      this.setState({
        photoPermission: response,
        checkingPermission: false,
      })
    })
  }

  permissionAuthorized = () => {
    this.setState({
      photoPermission: RESULTS.GRANTED,
    })
  }

  toggleSelection = file => {
    const { selectedFiles, selectedIndex, onSelect } = this.props
    const index = this.indexOfItem(file)

    if (index >= 0) {
      if (selectedIndex === index) {
        selectedFiles.splice(index, 1)
        const prevIndex = index || selectedFiles.length
        onSelect(selectedFiles, prevIndex - 1 || 0)
      } else {
        onSelect(selectedFiles, index)
      }
    } else if (MAX_SELECTED_FILES > selectedFiles.length) {
      const lastIndex = selectedFiles.push(file) - 1
      onSelect(selectedFiles, lastIndex)
    }
  }

  changeAlbum = album => {
    this.setState({ album })
    this.bottomSheetRef.current.snapTo(0)
  }

  indexOfItem(item) {
    return findIndex(propEq('uri', item.uri))(this.props.selectedFiles)
  }

  renderInner = () => <Albums onPress={this.changeAlbum} />

  render() {
    const { photoPermission, album, checkingPermission } = this.state

    if (checkingPermission) {
      return null
    }

    if (photoPermission !== RESULTS.GRANTED) {
      return (
        <AskForPermission
          permission={PERMISSION}
          onSuccess={this.permissionAuthorized}
          type="photo"
        />
      )
    }

    return (
      <>
        <OpenAlbum onPress={() => this.bottomSheetRef.current.snapTo(1)} />
        <List
          album={album}
          onSelect={this.toggleSelection}
          selected={this.props.selectedFiles}
          cameraFile={this.props.cameraFile}
        />
        <BottomSheet
          ref={this.bottomSheetRef}
          snapPoints={[0, '60%']}
          renderContent={this.renderInner}
        />
      </>
    )
  }
}

export default withTranslation('MediaPicker')(MediaPicker)
