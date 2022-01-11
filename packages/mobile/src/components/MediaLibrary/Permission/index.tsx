import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import AskForPermission from 'components/AskForPermission'
import Header from '../Header'

function Permission({ onSuccess, onCancel }) {
  const { t } = useTranslation('library')

  return (
    <>
      <AskForPermission onSuccess={onSuccess} type="photo" />
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
