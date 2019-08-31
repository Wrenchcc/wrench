import React, { memo, useEffect, useState, useCallback } from 'react'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { useTranslation } from 'react-i18next'
import AskForPermission from 'features/project/components/AskForPermission'
import { Text, Icon } from 'ui'
import { arrowDown } from 'images'
import { isIphone } from 'utils/platform'
import List from './List'
import { Base, Header, OpenAlbums } from './styles'

const PERMISSION = isIphone
  ? PERMISSIONS.IOS.PHOTO_LIBRARY
  : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE

function MediaPicker({ openAlbums, selectedAlbum, setAlbum }) {
  const [isLoading, setLoading] = useState(true)
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
  )
}

export default memo(MediaPicker)
