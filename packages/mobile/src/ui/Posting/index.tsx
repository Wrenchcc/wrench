import React from 'react'
import { View, useColorScheme } from 'react-native'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import Image from 'ui/Image'

const styles = {
  base: {
    height: 60,
    marginHorizontal: 10,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
}

function Posting({ file }) {
  const { t } = useTranslation('posting')
  const colorScheme = useColorScheme()

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor:
            colorScheme === 'dark' ? 'rgba(25, 25, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)',
        },
      ]}
    >
      <View style={styles.inner}>
        <Image source={file} style={styles.image} width={40} height={40} />
        <Text fontSize={15}>{t('description')}</Text>
      </View>
    </View>
  )
}

export default Posting
