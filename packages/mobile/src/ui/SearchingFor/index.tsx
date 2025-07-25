import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import ActivityIndicator from 'ui/ActivityIndicator'

function SearchingFor({ query }) {
  const { t } = useTranslation('searching-for')

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20,
      }}
    >
      <ActivityIndicator />
      <Text style={{ paddingHorizontal: 20 }} color="neutral" numberOfLines={1}>{`${t(
        'title'
      )} "${query}"`}</Text>
    </View>
  )
}

export default SearchingFor
