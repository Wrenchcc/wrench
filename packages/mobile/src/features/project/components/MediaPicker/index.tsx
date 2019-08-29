import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import { Dimensions } from 'react-native'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions'
import BottomSheet from 'reanimated-bottom-sheet'
import AsyncStorage from '@react-native-community/async-storage'
import { useTranslation } from 'react-i18next'
import AskForPermission from 'features/project/components/AskForPermission'
import { SELECTED_ALBUM_KEY } from 'utils/storage/constants'
import { Text, Icon } from 'ui'
import { arrowDown } from 'images'
import { isIphone, isAndroid, hasNotch } from 'utils/platform'
import List from './List'
import Albums from './Albums'
import { Base, Header, OpenAlbums } from './styles'

const { height } = Dimensions.get('window')

const PERMISSION = isIphone
  ? PERMISSIONS.IOS.PHOTO_LIBRARY
  : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE

const BOTTOM_SHEET_HEIGHT = height - (isAndroid ? 24 : hasNotch ? 44 : 20) // TODO: fix status bar constant from navigation

function MediaPicker() {
  const bottomSheet = useRef()
  const [isLoading, setLoading] = useState(true)
  const [selectedAlbum, setAlbum] = useState()
  const [loadAlbums, setLoadAlbums] = useState(false)
  const [checkingPermission, setCheckingPermission] = useState(true)
  const [photoPermission, setPhotoPermission] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    check(PERMISSION).then(response => {
      setLoading(false)
      setPhotoPermission(response)
      setCheckingPermission(false)
    })
  }, [])

  const loadSavedAlbum = useCallback(async () => {
    const album = await AsyncStorage.getItem(SELECTED_ALBUM_KEY)

    if (album) {
      setAlbum(JSON.parse(album))
    }
  }, [setAlbum])

  useEffect(() => {
    loadSavedAlbum()
  }, [])

  const changeAlbum = useCallback(
    album => {
      setAlbum(album)
      bottomSheet.current.snapTo(0)
      AsyncStorage.setItem(SELECTED_ALBUM_KEY, JSON.stringify(album))
    },
    [setAlbum, bottomSheet]
  )

  const openAlbums = useCallback(() => {
    setLoadAlbums(true)
    bottomSheet.current.snapTo(1)
  }, [setLoadAlbums, bottomSheet])

  const renderAlbums = useCallback(() => loadAlbums && <Albums onPress={changeAlbum} />, [
    changeAlbum,
    loadAlbums,
  ])

  const permissionAuthorized = useCallback(() => {
    setPhotoPermission(RESULTS.GRANTED)
  }, [setPhotoPermission])

  if (checkingPermission || isLoading) {
    return null
  }

  if (photoPermission !== RESULTS.GRANTED) {
    return (
      <AskForPermission permission={PERMISSION} onSuccess={permissionAuthorized} type="photo" />
    )
  }

  return (
    <>
      <BottomSheet
        ref={bottomSheet}
        initialSnap={0}
        snapPoints={[0, BOTTOM_SHEET_HEIGHT]}
        renderContent={renderAlbums}
      />

      <Base>
        <Header>
          <OpenAlbums onPress={openAlbums}>
            <Text medium color="white" numberOfLines={1}>
              {(selectedAlbum && selectedAlbum.title) || t('MediaPicker:roll')}
            </Text>
            <Icon source={arrowDown} style={{ marginLeft: 10 }} onPress={openAlbums} />
          </OpenAlbums>
        </Header>

        <List album={selectedAlbum && selectedAlbum.id} setAlbum={setAlbum} />
      </Base>
    </>
  )
}

export default memo(MediaPicker)
