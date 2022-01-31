import React from 'react'
import { Linking } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Touchable, Text } from 'ui'
import { Base, Headline, Description } from './styles'
import * as MediaLibrary from 'expo-media-library'

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
    <Base>
      <Headline color="white" medium numberOfLines={0}>
        {t(`${type}.permissionHeadline`)}
      </Headline>
      <Description color="white" opacity={0.8}>
        {t(`${type}.permissionDescription`)}
      </Description>

      <Touchable onPress={onPress}>
        <Text color="white" medium>
          {t(`${type}.permissionButton`)}
        </Text>
      </Touchable>
    </Base>
  )
}

export default AskForPermission
