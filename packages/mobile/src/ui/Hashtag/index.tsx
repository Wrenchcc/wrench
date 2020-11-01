import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import { Base } from './styles'

function Hashtag({ name, totalCount, onPress }) {
  const { t } = useTranslation('hashtag')

  return (
    <Base onPress={onPress}>
      <Text>{`#${name}`}</Text>
      <Text color="accent" fontSize={14} medium>
        {t('posts', { count: totalCount })}
      </Text>
    </Base>
  )
}

export default Hashtag
