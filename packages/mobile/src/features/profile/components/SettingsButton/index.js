import React, { memo } from 'react'
import { withNamespaces } from 'react-i18next'
import Text from 'ui/Text'
import { navigateToSettings } from 'navigation/actions'

const SettingsButton = memo(({ t }) => (
    <Text medium onPress={() => navigateToSettings()}>
      {t('SettingsButton:settings')}
    </Text>
))

export default withNamespaces('SettingsButton')(SettingsButton)
