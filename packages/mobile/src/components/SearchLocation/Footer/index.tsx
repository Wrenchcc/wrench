import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { mapbox } from 'images'
import { Text, Icon } from 'ui'

const styles = {
  base: {
    alignSelf: 'center',
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

function Footer() {
  const { t } = useTranslation('search-location-footer')

  return (
    <View style={styles.base}>
      <Text fontSize={12} color="neutral" style={{ marginRight: 5 }}>
        {t('poweredBy')}
      </Text>
      <Icon source={mapbox} color="neutral" />
    </View>
  )
}

export default Footer
