import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import Touchable from 'ui/Touchable'

const styles = {
  base: {
    flexDirection: 'column',
  },
}

function Hashtag({ name, totalCount, onPress }) {
  const { t } = useTranslation('hashtag')

  return (
    <Touchable onPress={onPress} style={styles.base}>
      <Text>{`#${name}`}</Text>
      <Text color="accent" fontSize={14} medium>
        {t('posts', { count: totalCount })}
      </Text>
    </Touchable>
  )
}

export default Hashtag
