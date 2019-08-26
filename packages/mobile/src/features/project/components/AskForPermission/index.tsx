import React, { useCallback } from 'react'
import { Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { request, openSettings, RESULTS } from 'react-native-permissions'
import { Touchable, Text } from 'ui'
import { Base, Headline, Description } from './styles'

const AskForPermission = ({ type, permission, onSuccess }) => {
  const { t } = useTranslation()

  const onPress = useCallback(
    () =>
      request(permission).then(res => {
        if (res !== RESULTS.GRANTED) {
          const buttons = [{ text: t(`AskForPermission:${type}:alertCancel`), style: 'cancel' }]

          buttons.push({
            onPress: () => openSettings(),
            text: t(`AskForPermission:${type}:alertOpen`),
          })

          Alert.alert(
            t(`AskForPermission:${type}.alertTitle`),
            t(`AskForPermission:${type}:alertDescription`),
            buttons
          )
        } else {
          onSuccess()
        }
      }),
    [type, permission, onSuccess]
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
