import React from 'react'
import { useTranslation } from 'react-i18next'
import { mapbox } from 'images'
import { Text, Icon } from 'ui'
import { Base } from './styles'

function Footer() {
  const { t } = useTranslation('search-location-footer')

  return (
    <Base>
      <Text fontSize={12} color="neutral" style={{ marginRight: 5 }}>
        {t('poweredBy')}
      </Text>
      <Icon source={mapbox} color="neutral" />
    </Base>
  )
}

export default Footer
