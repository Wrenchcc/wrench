import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'
import { check, IOS_PERMISSIONS, RESULTS } from 'react-native-permissions'
import withTranslation from 'i18n/withTranslation'
import { findIndex, propEq } from 'ramda'
import AskForPermission from 'features/project/components/AskForPermission'
import List from './List'
// import BottomSheet from './BottomSheet'

const MAX_SELECTED_FILES = 10

class MediaPicker extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedFiles: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number,
  }

  constructor(props) {
    super(props)

    // this.bottomSheetRef = React.createRef()

    this.state = {
      album: null,
    }

    if (Platform.OS === 'ios') {
      this.checkPhotoPermission()
    }
  }

  checkPhotoPermission = () => {
    check(IOS_PERMISSIONS.PHOTO_LIBRARY).then(response => {
      this.setState({
        photoPermission: response,
      })
    })
  }

  permissionAuthorized = () => {
    // this.setState({ photoPermission: RESULTS.GRANTED }, this.getAlbums)
  }

  toggleSelection = file => {
    const { selectedFiles, selectedIndex, onSelect } = this.props
    const index = this.indexOfItem(file)

    // this.bottomSheetRef.current.snapTo(0)

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

  indexOfItem(item) {
    return findIndex(propEq('uri', item.uri))(this.props.selectedFiles)
  }

  render() {
    const { photoPermission, album } = this.state

    if (photoPermission !== RESULTS.GRANTED) {
      return (
        <AskForPermission
          permission={IOS_PERMISSIONS.PHOTO_LIBRARY}
          onSuccess={this.permissionAuthorized}
        />
      )
    }

    return (
      <List
        album={album}
        onSelect={this.toggleSelection}
        selected={this.props.selectedFiles}
        cameraFile={this.props.cameraFile}
      />
    )
  }
}

export default withTranslation('MediaPicker')(MediaPicker)
