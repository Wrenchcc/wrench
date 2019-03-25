import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, TouchableOpacity, View, Platform } from 'react-native'
import GalleryManager from 'react-native-gallery-manager'
import { TabView } from 'react-native-tab-view'
import { check, IOS_PERMISSIONS, RESULTS } from 'react-native-permissions'
import Animated from 'react-native-reanimated'
import { findIndex, propEq } from 'ramda'
import AskForPermission from 'features/project/components/AskForPermission'
import List from './List'
import Tabs from './Tabs'

const MAX_SELECTED_FILES = 10
// const NEW_CAMERA_FILE = 'new_camera_file'

const styles = {
  tabBar: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  tabItem: {
    padding: 16,
  },
}

const { width } = Dimensions.get('window')

export default class MediaPicker extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedFiles: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number,
  }

  // static getDerivedStateFromProps(props, state) {
  //   const newItem = find(propEq(NEW_CAMERA_FILE, true), props.selectedFiles)
  //
  //   if (newItem && newItem.uri !== pathOr(false, ['data', 0, 'uri'], state)) {
  //     return {
  //       data: [omit([NEW_CAMERA_FILE], newItem), ...state.data],
  //     }
  //   }
  //
  //   return state
  // }

  state = {
    index: 0,
    isLoading: true,
    routes: [
      {
        key: '',
        title: 'All',
      },
      {
        key: 'Album',
        title: 'Album',
      },
      {
        key: 'Event',
        title: 'Event',
      },
      {
        key: 'Faces',
        title: 'Faces',
      },
      {
        key: 'Library',
        title: 'Library',
      },
      {
        key: 'PhotoStream',
        title: 'Photo stream',
      },
      {
        key: 'SavedPhotos',
        title: 'Saved photos',
      },
    ],
  }

  constructor(props) {
    super(props)

    if (Platform.OS === 'ios') {
      this.checkPhotoPermission()
    }

    this.getAlbums()
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // if (
  //   //   nextProps.selected
  //   //   || nextProps.selected.length !== this.props.selected.length
  //   //   || nextProps.albumName !== this.props.albumName
  //   //   || nextState.data.length !== this.state.data.length
  //   // ) {
  //   //   return true
  //   // }
  //
  //   if (nextState) {
  //     return true
  //   }
  //
  //   return false
  // }

  getAlbums = async () => {
    try {
      const { albums } = await GalleryManager.getAlbums()

      this.setState(prevState => ({
        isLoading: false,
        routes: prevState.routes.concat(
          albums.map(a => ({
            title: a.title,
            key: a.title,
          }))
        ),
      }))
    } catch (err) {
      console.log(err)
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
    this.setState({ photoPermission: RESULTS.GRANTED }, this.getAlbums)
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

  onIndexChange = index => {
    this.setState({ index })
  }

  indexOfItem(item) {
    return findIndex(propEq('uri', item.uri))(this.props.selectedFiles)
  }

  renderScene = ({ route }) => (
    <List
      albumName={route.key}
      onSelect={this.toggleSelection}
      selected={this.props.selectedFiles}
    />
  )

  render() {
    const { photoPermission, isLoading } = this.state

    if (isLoading) {
      return null
    }

    if (photoPermission !== RESULTS.GRANTED) {
      return (
        <AskForPermission
          permission={IOS_PERMISSIONS.PHOTO_LIBRARY}
          onSuccess={this.permissionAuthorized}
        />
      )
    }

    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene}
        onIndexChange={this.onIndexChange}
        initialLayout={{ width }}
        renderTabBar={props => <Tabs {...props} />}
        lazy
      />
    )
  }
}
