import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'

function NoResults() {
  const { t } = useTranslation('no-results')

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Text color="neutral">{t('title')}</Text>
    </View>
  )
}

export default NoResults
