import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Platform, Dimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { useTranslation } from 'react-i18next'
import * as MediaLibrary from 'expo-media-library'
import { check, IOS_PERMISSIONS, ANDROID_PERMISSIONS, RESULTS } from 'react-native-permissions'
import { prepend, findIndex, propEq } from 'ramda'
import AskForPermission from 'features/project/components/AskForPermission'
import { Text, Touchable } from 'ui'
import List from './List'
import Tabs from './Tabs'

const { width } = Dimensions.get('window')

const PERMISSION =
  Platform.OS === 'ios' ? IOS_PERMISSIONS.PHOTO_LIBRARY : ANDROID_PERMISSIONS.READ_EXTERNAL_STORAGE

const MAX_SELECTED_FILES = 10

function MediaPicker({ selectedFiles, selectedIndex, onSelect, cameraFile }) {
  const { t } = useTranslation()
  const [tabIndex, setTabIndex] = useState(0)
  const [albums, setAlbums] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [checkingPermission, setCheckingPermission] = useState(true)
  const [photoPermission, setPhotoPermission] = useState(false)

  async function fetchAlbums() {
    try {
      const first = {
        id: null,
        title: t('MediaPicker:all'),
      }

      const results = await MediaLibrary.getAlbumsAsync()
      const assets = prepend(first, results)

      setAlbums(
        assets.map(album => ({
          key: album.id,
          title: album.title,
        }))
      )

      setLoading(false)
    } catch (err) {
      logError(err)
    }
  }

  useEffect(() => {
    fetchAlbums()
  }, [])

  useEffect(() => {
    check(PERMISSION).then(response => {
      setPhotoPermission(response)
      setCheckingPermission(false)
    })
  }, [])

  const handleIndexChange = useCallback(
    activeIndex => {
      setTabIndex(activeIndex)
    },
    [tabIndex]
  )

  const toggleSelection = useCallback(
    file => {
      const index = findIndex(propEq('uri', file.uri))(selectedFiles)

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
    },
    [selectedFiles, tabIndex, onSelect, selectedIndex]
  )

  const permissionAuthorized = useCallback(() => {
    setPhotoPermission(RESULTS.GRANTED)
  }, [])

  const renderScene = ({ route }) => {
    return <List album={route.key} onSelect={toggleSelection} selected={selectedFiles} />
  }

  const renderTabs = useCallback(props => <Tabs {...props} />, [])

  const navigationState = useMemo(
    () => ({
      index: tabIndex,
      routes: albums,
    }),
    [tabIndex, albums]
  )

  if (checkingPermission || isLoading) {
    return null
  }

  if (photoPermission !== RESULTS.GRANTED) {
    return (
      <AskForPermission permission={PERMISSION} onSuccess={permissionAuthorized} type="photo" />
    )
  }

  return (
    <TabView
      navigationState={navigationState}
      renderTabBar={renderTabs}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{ width }}
      lazy
    />
  )
}

export default MediaPicker
