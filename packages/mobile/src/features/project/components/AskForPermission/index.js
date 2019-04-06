import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import { request, openSettings, RESULTS } from 'react-native-permissions'
import withTranslation from 'i18n/withTranslation'
import { Touchable, Text } from 'ui'
import { Base, Headline, Description } from './styles'

const AskForPermission = ({ t, type, permission, onSuccess }) => {
  const onPress = () => request(permission).then(res => {
    if (res !== RESULTS.GRANTED) {
      const buttons = [{ text: t(`AskForPermission:${type}:alertCancel`), style: 'cancel' }]

      buttons.push({
        text: t(`AskForPermission:${type}:alertOpen`),
        onPress: () => openSettings(),
      })

      Alert.alert(
        t(`AskForPermission:${type}.alertTitle`),
        t(`AskForPermission:${type}:alertDescription`),
        buttons
      )
    } else {
      onSuccess()
    }
  })

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

AskForPermission.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  permission: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default withTranslation('AskForPermission')(AskForPermission)
