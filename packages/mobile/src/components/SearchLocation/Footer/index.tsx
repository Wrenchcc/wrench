import React from 'react'
import { useTranslation } from 'react-i18next'
import { mapbox } from 'images'
import { Text, Icon } from 'ui'
import { Base } from './styles'

function Footer() {
  const { t } = useTranslation()

  return (
    <Base>
      <Text fontSize={12} color="grey" style={{ marginRight: 5 }}>
        {t('SearchLocationFooter:poweredBy')}
      </Text>
      <Icon source={mapbox} color="grey" />
    </Base>
  )
}

export default Footer
