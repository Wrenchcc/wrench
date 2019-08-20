import React, { memo, useEffect, useState, useCallback, useMemo } from 'react'
import { Dimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { useTranslation } from 'react-i18next'
import * as MediaLibrary from 'react-native-media-library'
import Permissions from 'react-native-permissions'
import AskForPermission from 'features/project/components/AskForPermission'
import { logError } from 'utils/sentry'
import List from './List'
import Tabs from './Tabs'

const { width } = Dimensions.get('window')

const PERMISSION = 'photo'
const AUTHORIZED = 'authorized'

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

  const navigationState = useMemo(
    () => ({
      index: tabIndex,
      routes: albums,
    }),
    [tabIndex, albums]
  )

  const fetchAlbums = async () => {
    try {
      const results = await MediaLibrary.getAlbumsAsync({ includeSmartAlbums: false })
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

  useEffect(() => {
    Permissions.check(PERMISSION).then(response => {
      if (response === AUTHORIZED) {
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
    setPhotoPermission(AUTHORIZED)

    fetchAlbums()
  }, [setPhotoPermission, fetchAlbums])

  const renderScene = useCallback(({ route }) => <List album={route.key} />, [])

  const renderTabBar = useCallback(props => albums.length > 1 && <Tabs {...props} />, [albums])

  if (checkingPermission || isLoading) {
    return null
  }

  if (photoPermission !== AUTHORIZED) {
    return (
      <AskForPermission permission={PERMISSION} onSuccess={permissionAuthorized} type="photo" />
    )
  }

  return (
    <TabView
      swipeVelocityThreshold={500}
      navigationState={navigationState}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{ width }}
      lazy
    />
  )
}

export default memo(MediaPicker)
