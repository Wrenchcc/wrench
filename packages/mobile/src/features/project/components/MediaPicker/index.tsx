import React, { memo, useEffect, useState, useCallback } from 'react'
import Permissions from 'react-native-permissions'
import AskForPermission from 'features/project/components/AskForPermission'
import List from './List'

const PERMISSION = 'photo'
const AUTHORIZED = 'authorized'

function MediaPicker() {
  const [isLoading, setLoading] = useState(true)
  const [checkingPermission, setCheckingPermission] = useState(true)
  const [photoPermission, setPhotoPermission] = useState(false)

  useEffect(() => {
    Permissions.check(PERMISSION).then(response => {
      setLoading(false)
      setPhotoPermission(response)
      setCheckingPermission(false)
    })
  }, [])

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

  return <List album={null} />
}

export default memo(MediaPicker)
