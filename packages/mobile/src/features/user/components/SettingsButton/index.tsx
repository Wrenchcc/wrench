import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import Text from 'ui/Text'

function SettingsButton() {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const handleNavigation = useCallback(() => navigate(SCREENS.SETTINGS), [])

  return (
    <Text medium onPress={handleNavigation}>
      {t('SettingsButton:settings')}
    </Text>
  )
}

export default SettingsButton
