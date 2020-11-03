import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Dimensions } from 'react-native'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import AsyncStorage from '@react-native-community/async-storage'
import BottomSheet from 'reanimated-bottom-sheet'
import AskForPermission from 'components/AskForPermission'
import { SELECTED_ALBUM_KEY } from 'utils/storage/constants'
import { isIphone, isAndroid } from 'utils/platform'
import { Icon } from 'ui'
import { album } from 'images'
import List from './List'
import Albums from './Albums'
import { Base, OpenAlbum } from './styles'

const { height } = Dimensions.get('window')

const BOTTOM_SHEET_HEIGHT = height / 2

const PERMISSION = isIphone
  ? PERMISSIONS.IOS.PHOTO_LIBRARY
  : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE

const WRITE_EXTERNAL_STORAGE_PERMISSION = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE

function MediaPicker({ ListHeaderComponent }) {
  const bottomSheet = useRef(null)

  const [isLoading, setLoading] = useState(true)
  const [checkingPermission, setCheckingPermission] = useState(true)
  const [photoPermission, setPhotoPermission] = useState('')
  const [loadAlbums, setLoadAlbums] = useState(false)
  const [selectedAlbum, setAlbum] = useState(null)

  useEffect(() => {
    check(PERMISSION).then((res) => {
      setLoading(false)
      setPhotoPermission(res)
      setCheckingPermission(false)
    })

    // NOTE: For saving image
    if (isAndroid) {
      check(WRITE_EXTERNAL_STORAGE_PERMISSION).then((res) => {
        // NOTE: Need to ask for permission here
        if (res !== RESULTS.GRANTED) {
          request(WRITE_EXTERNAL_STORAGE_PERMISSION)
        }
      })
    }
  }, [])

  const loadSavedAlbum = useCallback(async () => {
    const a = await AsyncStorage.getItem(SELECTED_ALBUM_KEY)

    if (a) {
      setAlbum(JSON.parse(a))
    }
  }, [setAlbum])

  useEffect(() => {
    loadSavedAlbum()
  }, [])

  const permissionAuthorized = useCallback(() => {
    setPhotoPermission(RESULTS.GRANTED)
  }, [setPhotoPermission])

  const handleOpenAlbum = useCallback(() => {
    // NOTE: setImmediate fixes issue with pressing twice
    setImmediate(() => {
      setLoadAlbums(true)
      bottomSheet.current.snapTo(1)
    })
  }, [setLoadAlbums, bottomSheet])

  const changeAlbum = useCallback(
    (a) => {
      // NOTE: setImmediate fixes issue with pressing twice
      setImmediate(() => {
        setAlbum(a)
        bottomSheet.current.snapTo(0)
        AsyncStorage.setItem(SELECTED_ALBUM_KEY, JSON.stringify(a))
      })
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
        <OpenAlbum onPress={handleOpenAlbum} naviteHandler>
          <Icon source={album} onPress={handleOpenAlbum} naviteHandler color="white" />
        </OpenAlbum>

        <List album={selectedAlbum?.id} ListHeaderComponent={ListHeaderComponent} />
      </Base>
    </>
  )
}

export default MediaPicker
