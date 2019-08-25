import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import Permissions from 'react-native-permissions'
import BottomSheet from 'reanimated-bottom-sheet'
import { useTranslation } from 'react-i18next'
import AskForPermission from 'features/project/components/AskForPermission'
import { Text, Icon } from 'ui'
import { arrowDown } from 'images'
import List from './List'
import Albums from './Albums'
import { Header, OpenAlbums } from './styles'

const PERMISSION = 'photo'
const AUTHORIZED = 'authorized'

function MediaPicker() {
  const bottomSheet = useRef()
  const [isLoading, setLoading] = useState(true)
  const [selectedAlbum, setAlbum] = useState()
  const [loadAlbums, setLoadAlbums] = useState(false)
  const [checkingPermission, setCheckingPermission] = useState(true)
  const [photoPermission, setPhotoPermission] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    Permissions.check(PERMISSION).then(response => {
      setLoading(false)
      setPhotoPermission(response)
      setCheckingPermission(false)
    })
  }, [])

  const changeAlbum = useCallback(
    album => {
      setAlbum(album)
      bottomSheet.current.snapTo(0)
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
    setPhotoPermission(AUTHORIZED)
  }, [setPhotoPermission])

  if (checkingPermission || isLoading) {
    return null
  }

  if (photoPermission !== AUTHORIZED) {
    return (
      <AskForPermission permission={PERMISSION} onSuccess={permissionAuthorized} type="photo" />
    )
  }

  return (
    <>
      <Header>
        <OpenAlbums onPress={openAlbums}>
          <Text medium color="white" numberOfLines={1}>
            {(selectedAlbum && selectedAlbum.title) || t('MediaPicker:roll')}
          </Text>
          <Icon source={arrowDown} style={{ marginLeft: 10 }} onPress={openAlbums} />
        </OpenAlbums>
      </Header>

      <List album={selectedAlbum && selectedAlbum.id} setAlbum={setAlbum} />

      <BottomSheet
        ref={bottomSheet}
        initialSnap={0}
        snapPoints={[0, '94%']}
        renderContent={renderAlbums}
      />
    </>
  )
}

export default memo(MediaPicker)
