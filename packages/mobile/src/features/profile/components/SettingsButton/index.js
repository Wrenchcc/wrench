import React, { memo } from 'react'
import withTranslation from 'i18n/withTranslation'
import Text from 'ui/Text'
import { navigateToSettings } from 'navigation/actions'

const SettingsButton = memo(({ t }) => (
  <Text medium onPress={() => navigateToSettings()}>
    {t('SettingsButton:settings')}
  </Text>
))

export default withTranslation('SettingsButton')(SettingsButton)
