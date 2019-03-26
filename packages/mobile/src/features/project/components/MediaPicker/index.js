import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Platform, View } from 'react-native'
import GalleryManager from 'react-native-gallery-manager'
import { TabView } from 'react-native-tab-view'
import { check, IOS_PERMISSIONS, RESULTS } from 'react-native-permissions'
import withTranslation from 'i18n/withTranslation'
import { findIndex, propEq } from 'ramda'
import { logError } from 'utils/analytics'
import AskForPermission from 'features/project/components/AskForPermission'
import BottomSheet from './BottomSheet'
import List from './List'
import Tabs from './Tabs'

const MAX_SELECTED_FILES = 10

const { width } = Dimensions.get('window')

class MediaPicker extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedFiles: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.bottomSheetRef = React.createRef()

    this.state = {
      index: 0,
      isLoading: true,
      routes: [
        {
          key: '',
          title: props.t('MediaPicker:all'),
        },
      ],
    }

    if (Platform.OS === 'ios') {
      this.checkPhotoPermission()
    }

    this.getAlbums()
  }

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
      logError(err)
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

    this.bottomSheetRef.current.snapTo(0)

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
      cameraFile={route.key === '' && this.props.cameraFile}
    />
  )

  renderHeader = () => <View style={{ backgroundColor: 'red', height: 60 }} />

  render() {
    const { photoPermission, isLoading, routes } = this.state
    const showTabs = routes.length > 1

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
      <BottomSheet
        ref={this.bottomSheetRef}
        snapPoints={['40%', '100%']}
        enabledGestureInteraction
        renderContent={() => (
          <View style={{ backgroundColor: 'black' }}>
            <TabView
              navigationState={this.state}
              renderScene={this.renderScene}
              onIndexChange={this.onIndexChange}
              initialLayout={{ width }}
              renderTabBar={props => showTabs && <Tabs {...props} />}
              lazy
            />
          </View>
        )}
        renderHeader={this.renderHeader}
      />
    )
  }
}

export default withTranslation('MediaPicker')(MediaPicker)
