import React, { memo } from 'react'
import { View } from 'react-native'
import withTranslation from 'i18n/withTranslation'
import Text from 'ui/Text'

const NoResults = memo(function NoResults({ t }) {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Text color="light_grey">{t('NoResults:title')}</Text>
    </View>
  )
})

export default withTranslation('NoResults')(NoResults)
