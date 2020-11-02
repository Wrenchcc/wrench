import React, { useCallback } from 'react'
import { Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { request, openSettings, RESULTS } from 'react-native-permissions'
import { Touchable, Text } from 'ui'
import { Base, Headline, Description } from './styles'

// t('ask-for-permission:camera.alertCancel')
// t('ask-for-permission:camera.alertOpen')
// t('ask-for-permission:camera.alertTitle')
// t('ask-for-permission:camera.alertDescription')
// t('ask-for-permission:camera.permissionHeadline')
// t('ask-for-permission:camera.permissionDescription')
// t('ask-for-permission:camera.permissionButton')

// t('ask-for-permission:photo.alertCancel')
// t('ask-for-permission:photo.alertOpen')
// t('ask-for-permission:photo.alertTitle')
// t('ask-for-permission:photo.alertDescription')
// t('ask-for-permission:photo.permissionHeadline')
// t('ask-for-permission:photo.permissionDescription')
// t('ask-for-permission:photo.permissionButton')

const AskForPermission = ({ type, permission, onSuccess }) => {
  const { t } = useTranslation('ask-for-permission')

  const onPress = useCallback(
    () =>
      request(permission).then((res) => {
        if (res !== RESULTS.GRANTED) {
          const buttons = [{ text: t(`${type}.alertCancel`), style: 'cancel' }]

          buttons.push({
            onPress: () => openSettings(),
            text: t(`${type}.alertOpen`),
          })

          Alert.alert(t(`${type}.alertTitle`), t(`${type}.alertDescription`), buttons)
        } else {
          onSuccess()
        }
      }),
    [type, permission, onSuccess]
  )

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
