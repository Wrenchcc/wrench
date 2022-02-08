import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import { Base, Inner, Image } from './styles'

function Posting({ file }) {
  const { t } = useTranslation('posting')
  return (
    <Base>
      <Inner>
        <Image source={file} />
        <Text fontSize={15}>{t('description')}</Text>
      </Inner>
    </Base>
  )
}

export default Posting
