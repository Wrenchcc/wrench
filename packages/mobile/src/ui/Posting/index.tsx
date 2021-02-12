import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import { Base, Inner, Cover } from './styles'

function Posting({ image }) {
  const { t } = useTranslation('posting')

  return (
    <Base>
      <Inner>
        <Cover source={image} />
        <Text fontSize={15}>{t('description')}</Text>
      </Inner>
    </Base>
  )
}

export default Posting
