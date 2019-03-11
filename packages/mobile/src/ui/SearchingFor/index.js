import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator } from 'react-native'
import withTranslation from 'i18n/withTranslation'
import Text from 'ui/Text'

const SearchingFor = memo(function SearchingFor({ t, query }) {
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
})

SearchingFor.propTypes = {
  query: PropTypes.string,
}

export default withTranslation('SearchingFor')(SearchingFor)
