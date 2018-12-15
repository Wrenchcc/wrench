import React from 'react'
import { View } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { Text } from 'ui'

function NoResults({ t }) {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Text color="light_grey">{t('NoResults:title')}</Text>
    </View>
  )
}

export default withNamespaces('NoResults')(NoResults)
