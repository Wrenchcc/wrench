import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Title, Text } from 'ui'

const styles = {
  base: {
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 50,
    paddingLeft: 20,
  },
  headline: {
    marginBottom: 10,
  },
}

function Content() {
  const { t } = useTranslation('onboarding')

  return (
    <View style={styles.base}>
      <Title medium style={styles.headline}>
        {t('headline')}
      </Title>
      <Text opacity={0.8}>{t('description')}</Text>
    </View>
  )
}

export default Content
