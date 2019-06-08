import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Platform } from 'react-native'
import { check, IOS_PERMISSIONS, ANDROID_PERMISSIONS, RESULTS } from 'react-native-permissions'
import BottomSheet from 'reanimated-bottom-sheet'
import { findIndex, propEq } from 'ramda'
import AskForPermission from 'features/project/components/AskForPermission'
import Albums from './Albums'
import OpenAlbum from './OpenAlbum'
import List from './List'

const PERMISSION =
  Platform.OS === 'ios' ? IOS_PERMISSIONS.PHOTO_LIBRARY : ANDROID_PERMISSIONS.READ_EXTERNAL_STORAGE

const MAX_SELECTED_FILES = 10

function MediaPicker({ selectedFiles, selectedIndex, onSelect, cameraFile }) {
  const ref = useRef()
  const [album, setAlbum] = useState(null)
  const [checkingPermission, setCheckingPermission] = useState(true)
  const [photoPermission, setPhotoPermission] = useState(false)

  useEffect(() => {
    check(PERMISSION).then(response => {
      setPhotoPermission(response)
      setCheckingPermission(false)
    })
  }, [])

  const handleOpen = useCallback(() => ref.current.snapTo(1), [ref])

  const indexOfItem = item => findIndex(propEq('uri', item.uri))(selectedFiles)

  const toggleSelection = file => {
    const index = indexOfItem(file)

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

  const permissionAuthorized = () => {
    setPhotoPermission(RESULTS.GRANTED)
  }

  const changeAlbum = selected => {
    setAlbum(selected)
    ref.current.snapTo(0)
  }

  const renderInner = () => <Albums onPress={changeAlbum} />

  if (checkingPermission) {
    return null
  }

  if (photoPermission !== RESULTS.GRANTED) {
    return (
      <AskForPermission permission={PERMISSION} onSuccess={permissionAuthorized} type="photo" />
    )
  }

  return (
    <>
      <OpenAlbum onPress={handleOpen} />
      <List
        album={album}
        onSelect={toggleSelection}
        selected={selectedFiles}
        cameraFile={cameraFile}
      />
      <BottomSheet ref={ref} snapPoints={[0, '60%']} renderContent={renderInner} />
    </>
  )
}

export default MediaPicker
