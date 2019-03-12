import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { check, IOS_PERMISSIONS, RESULTS } from 'react-native-permissions'
import Animated from 'react-native-reanimated'
import { findIndex, propEq } from 'ramda'
import AskForPermission from 'features/project/components/AskForPermission'
import List from './List'

const { width } = Dimensions.get('window')

const MAX_SELECTED_FILES = 10

const styles = {
  tabBar: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  tabItem: {
    padding: 16,
  },
}

export default class MediaPicker extends Component {
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
    routes: [
      {
        key: 'All',
        title: 'All',
      },
      {
        key: 'Album',
        title: 'Album',
      },
      // {
      //   key: 'Event',
      //   title: 'Event',
      // },
      // {
      //   key: 'Faces',
      //   title: 'Faces',
      // },
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
    this.checkPhotoPermission()
  }

  checkPhotoPermission = () => {
    check(IOS_PERMISSIONS.PHOTO_LIBRARY).then(response => {
      this.setState({
        photoPermission: response,
      })
    })
  }

  permissionAuthorized = () => {
    this.setState({ photoPermission: RESULTS.GRANTED })
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

  indexOfItem(item) {
    return findIndex(propEq('uri', item.uri))(this.props.selectedFiles)
  }

  renderScene = ({ route }) => <List groupType={route.key} />

  renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i)

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex => (inputIndex === i ? 111 : 255)),
              })
            ),
            255,
            255
          )

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}
              key={route.key}
            >
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  render() {
    const { photoPermission } = this.state

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
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width }}
        renderTabBar={this.renderTabBar}
      />
    )
  }
}
