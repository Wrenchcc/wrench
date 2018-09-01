import React from 'react'
import withLocalization from 'i18n/withLocalization'
import Text from 'ui/Text'
import { navigateToSettings } from 'navigation'

const SettingsButton = ({ t }) => (
  <Text medium onPress={() => navigateToSettings()}>
    {t('.settings')}
  </Text>
)

export default withLocalization(SettingsButton, 'SettingsButton')
