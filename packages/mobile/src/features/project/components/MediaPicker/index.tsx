import React, { memo, useEffect, useState, useRef, useCallback } from 'react'
import { Dimensions, View } from 'react-native'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import AsyncStorage from '@react-native-community/async-storage'
import BottomSheet from 'reanimated-bottom-sheet'
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

const BOTTOM_SHEET_HEIGHT = height - (isAndroid ? 24 : hasNotch ? 44 : 20) // TODO: fix status bar constant from navigation

const PERMISSION = isIphone
  ? PERMISSIONS.IOS.PHOTO_LIBRARY
  : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE

const WRITE_EXTERNAL_STORAGE_PERMISSION = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE

function MediaPicker() {
  const [isLoading, setLoading] = useState(true)
  const [checkingPermission, setCheckingPermission] = useState(true)
  const [photoPermission, setPhotoPermission] = useState(false)
  const [loadAlbums, setLoadAlbums] = useState(false)
  const [selectedAlbum, setAlbum] = useState()
  const { t } = useTranslation()
  const bottomSheet = useRef()

  useEffect(() => {
    check(PERMISSION).then(res => {
      setLoading(false)
      setPhotoPermission(res)
      setCheckingPermission(false)
    })

    // NOTE: For saving image
    if (isAndroid) {
      check(WRITE_EXTERNAL_STORAGE_PERMISSION).then(res => {
        // NOTE: Need to ask for permission here
        if (res !== RESULTS.GRANTED) {
          request(WRITE_EXTERNAL_STORAGE_PERMISSION)
        }
      })
    }
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

  const permissionAuthorized = useCallback(() => {
    setPhotoPermission(RESULTS.GRANTED)
  }, [setPhotoPermission])

  const openAlbums = useCallback(() => {
    setLoadAlbums(true)
    bottomSheet.current.snapTo(1)
  }, [setLoadAlbums, bottomSheet])

  const changeAlbum = useCallback(
    album => {
      setAlbum(album)
      bottomSheet.current.snapTo(0)
      AsyncStorage.setItem(SELECTED_ALBUM_KEY, JSON.stringify(album))
    },
    [setAlbum, bottomSheet]
  )

  const renderAlbums = useCallback(() => loadAlbums && <Albums onPress={changeAlbum} />, [
    changeAlbum,
    loadAlbums,
  ])

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
        snapPoints={[0, BOTTOM_SHEET_HEIGHT]}
        renderContent={renderAlbums}
      />
      <Base>
        <Header>
          <OpenAlbums onPress={openAlbums} nativeHandler>
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
