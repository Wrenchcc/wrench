import React, { useCallback } from 'react'
import { Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import Permissions from 'react-native-permissions'
import { Touchable, Text } from 'ui'
import { Base, Headline, Description } from './styles'

const AUTHORIZED = 'authorized'

const AskForPermission = ({ type, permission, onSuccess }) => {
  const { t } = useTranslation()
  
  const onPress = useCallback(
    () => Permissions.request(permission).then(res => {
    if (res !== AUTHORIZED) {
      const buttons = [{ text: t(`AskForPermission:${permission}:alertCancel`), style: 'cancel' }]

      if (Permissions.canOpenSettings()) {
        buttons.push({
          text: t(`AskForPermission:${permission}:alertOpen`),
          onPress: () => Permissions.openSettings(),
        })
      }

      Alert.alert(
        t(`AskForPermission:${permission}.alertTitle`),
        t(`AskForPermission:${permission}:alertDescription`),
        buttons
      )
    } else {
      onSuccess()
    }
  }), [type, permission, onSuccess]
  )

  return (
    <Base>
      <Headline color="white" medium numberOfLines={0}>
        {t(`AskForPermission:${type}:permissionHeadline`)}
      </Headline>
      <Description color="white" opacity={0.8}>
        {t(`AskForPermission:${type}:permissionDescription`)}
      </Description>

      <Touchable onPress={onPress}>
        <Text color="white" medium>
          {t(`AskForPermission:${type}:permissionButton`)}
        </Text>
      </Touchable>
    </Base>
  )
}

export default AskForPermission
