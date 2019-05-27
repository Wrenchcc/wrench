import React, { useCallback } from 'react'
import withTranslation from 'i18n/withTranslation'
import Text from 'ui/Text'
import { useNavigation, SCREENS } from 'navigation'

const SettingsButton = ({ t }) => {
  const { navigate } = useNavigation()
  const handleNavigation = useCallback(() => navigate(SCREENS.SETTINGS), [])

  return (
    <Text medium onPress={handleNavigation}>
      {t('SettingsButton:settings')}
    </Text>
  )
}

export default withTranslation('SettingsButton')(SettingsButton)
