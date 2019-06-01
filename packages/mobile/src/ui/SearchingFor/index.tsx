import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'

function SearchingFor({ query }) {
  const { t } = useTranslation()

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
      }}
    >
      <ActivityIndicator size="small" color="black" />
      <Text
        style={{ paddingLeft: 20, paddingRight: 20 }}
        color="light_grey"
        numberOfLines={1}
      >{`${t('SearchingFor:title')} "${query}"`}</Text>
    </View>
  )
}

export default SearchingFor
