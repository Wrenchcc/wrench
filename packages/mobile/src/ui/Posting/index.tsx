import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import { Base, Inner, Image } from './styles'

function Posting({ file }) {
  const { t } = useTranslation('posting')

  // TODO: file.uri or file.posterUri
  return (
    <Base>
      <Inner>
        <Image source={file} fadeDuration={0} />
        <Text fontSize={15}>{t('description')}</Text>
      </Inner>
    </Base>
  )
}

export default Posting
