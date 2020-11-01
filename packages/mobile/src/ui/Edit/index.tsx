import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import Text from 'ui/Text'

function Edit({ project, onDeleteCallback }) {
  const { t } = useTranslation('edit')
  const { showModal } = useNavigation()
  const handleNavigation = useCallback(
    () =>
      showModal(SCREENS.EDIT_PROJECT, {
        project,
        onDeleteCallback,
      }),
    [project]
  )

  return (
    <Text medium onPress={handleNavigation}>
      {t('edit')}
    </Text>
  )
}

export default Edit
