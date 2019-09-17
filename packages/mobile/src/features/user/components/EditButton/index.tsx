import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import Text from 'ui/Text'

function EditButton() {
  const { t } = useTranslation()
  const { showModal } = useNavigation()
  const handleNavigation = useCallback(() => showModal(SCREENS.EDIT_PROFILE), [])

  return (
    <Text medium onPress={handleNavigation}>
      {t('EditButton:edit')}
    </Text>
  )
}

export default EditButton
