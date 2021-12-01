import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { PERMISSIONS } from 'react-native-permissions'
import { useTranslation } from 'react-i18next'
import { isIphone } from 'utils/platform'
import Text from 'ui/Text'
import AskForPermission from 'components/AskForPermission'
import Header from '../Header'

const PERMISSION = isIphone
  ? PERMISSIONS.IOS.PHOTO_LIBRARY
  : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE

function Permission({ onSuccess, onCancel }) {
  const { t } = useTranslation('library')

  return (
    <>
      <AskForPermission permission={PERMISSION} onSuccess={onSuccess} type="photo" />
      <Header
        headerLeft={
          <TouchableOpacity onPress={onCancel}>
            <Text>{t('cancel')}</Text>
          </TouchableOpacity>
        }
      />
    </>
  )
}

export default Permission
