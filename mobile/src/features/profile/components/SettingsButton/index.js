import React from 'react'
import { translate } from 'react-i18next'
import Text from 'ui/Text'
import { navigateToSettings } from 'navigation'

const SettingsButton = ({ t }) => (
  <Text medium onPress={() => navigateToSettings()}>
    {t('SettingsButton:settings')}
  </Text>
)

export default translate('SettingsButton')(SettingsButton)
