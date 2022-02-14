import React from 'react'
import { Linking, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Touchable, Title, Text } from 'ui'
import * as MediaLibrary from 'expo-media-library'

const styles = {
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: 'black',
  },
  headline: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 30,
  },
}

const AskForPermission = ({ type, onSuccess }) => {
  const { t } = useTranslation('ask-for-permission')

  const onPress = async () => {
    const status = await MediaLibrary.requestPermissionsAsync()

    if (status?.granted) {
      onSuccess()
    } else {
      await Linking.openSettings()
    }
  }

  return (
    <View style={styles.base}>
      <Title color="white" medium numberOfLines={0} style={styles.headline}>
        {t(`${type}.permissionHeadline`)}
      </Title>
      <Text color="white" opacity={0.8} style={styles.description}>
        {t(`${type}.permissionDescription`)}
      </Text>

      <Touchable onPress={onPress}>
        <Text color="white" medium>
          {t(`${type}.permissionButton`)}
        </Text>
      </Touchable>
    </View>
  )
}

export default AskForPermission
