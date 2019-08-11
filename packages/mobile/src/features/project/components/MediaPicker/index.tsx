import React, { memo, useEffect, useState, useCallback } from 'react'
import { Dimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { useTranslation } from 'react-i18next'
import * as MediaLibrary from 'expo-media-library'
import { check, IOS_PERMISSIONS, ANDROID_PERMISSIONS, RESULTS } from 'react-native-permissions'
import { prepend } from 'ramda'
import AskForPermission from 'features/project/components/AskForPermission'
import { Text, Touchable } from 'ui'
import { isIphone } from 'utils/platform'
import { logError } from 'utils/sentry'
import List from './List'
import Tabs from './Tabs'

const { width } = Dimensions.get('window')

const PERMISSION = isIphone
  ? IOS_PERMISSIONS.PHOTO_LIBRARY
  : ANDROID_PERMISSIONS.READ_EXTERNAL_STORAGE

function MediaPicker() {
  const { t } = useTranslation()
  const [tabIndex, setTabIndex] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [checkingPermission, setCheckingPermission] = useState(true)
  const [photoPermission, setPhotoPermission] = useState(false)
  const [albums, setAlbums] = useState([
    {
      id: null,
      title: t('MediaPicker:all'),
    },
  ])

  const fetchAlbums = async () => {
    try {
      const results = await MediaLibrary.getAlbumsAsync()
      const filteredAlbums = results.filter(({ assetCount }) => assetCount !== 0)

      const assets = albums.concat(filteredAlbums)

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

  // TODO: Crashes on Android
  // https://github.com/expo/expo/issues/2004
  useEffect(() => {
    check(PERMISSION).then(response => {
      if (response === RESULTS.GRANTED && isIphone) {
        fetchAlbums()
      }

      setLoading(false)
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

  const permissionAuthorized = useCallback(() => {
    setPhotoPermission(RESULTS.GRANTED)
    // TODO: Crashes on Android
    // https://github.com/expo/expo/issues/2004
    if (isIphone) {
      fetchAlbums()
    }
  }, [setPhotoPermission, fetchAlbums])

  const renderScene = ({ route }) => <List album={route.key} />

  const renderTabBar = useCallback(props => albums.length > 1 && <Tabs {...props} />, [albums])

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
      navigationState={{
        index: tabIndex,
        routes: albums,
      }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{ width }}
      lazy
    />
  )
}

export default memo(MediaPicker)
