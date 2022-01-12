import React from 'react'
import Touchable from 'ui/Touchable'
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
          <Touchable onPress={onCancel}>
            <Text>{t('cancel')}</Text>
          </Touchable>
        }
      />
    </>
  )
}

export default Permission
