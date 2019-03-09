import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import { request, openSettings, RESULTS } from 'react-native-permissions'
import withTranslation from 'i18n/withTranslation'
import { Touchable, Text } from 'ui'
import { Base, Headline, Description } from './styles'

const AskForPermission = ({ t, permission, onSuccess }) => {
  const key = permission.toLowerCase()

  const onPress = () => request(permission).then(res => {
    if (res !== RESULTS.GRANTED) {
      const buttons = [{ text: t(`AskForPermission:${key}:alertCancel`), style: 'cancel' }]

      buttons.push({
        text: t(`AskForPermission:${key}:alertOpen`),
        onPress: () => openSettings(),
      })

      Alert.alert(
        t(`AskForPermission:${key}.alertTitle`),
        t(`AskForPermission:${key}:alertDescription`),
        buttons
      )
    } else {
      onSuccess()
    }
  })

  return (
    <Base>
      <Headline color="white" medium numberOfLines={0}>
        {t(`AskForPermission:${key}:permissionHeadline`)}
      </Headline>
      <Description color="white" opacity={0.8}>
        {t(`AskForPermission:${key}:permissionDescription`)}
      </Description>

      <Touchable onPress={onPress}>
        <Text color="white" medium>
          {t(`AskForPermission:${key}:permissionButton`)}
        </Text>
      </Touchable>
    </Base>
  )
}

AskForPermission.propTypes = {
  permission: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
}

export default withTranslation('AskForPermission')(AskForPermission)
