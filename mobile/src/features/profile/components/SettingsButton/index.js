import React from 'react'
import { withNamespaces } from 'react-i18next'
import Text from 'ui/Text'
import { navigateToSettings } from 'navigation'

const SettingsButton = ({ t }) => (
  <Text medium onPress={() => navigateToSettings()}>
    {t('SettingsButton:settings')}
  </Text>
)

export default withNamespaces('SettingsButton')(SettingsButton)
