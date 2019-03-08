import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import { request, openSettings, canOpenSettings, RESULTS } from 'react-native-permissions'
import withTranslation from 'i18n/withTranslation'
import { Touchable, Text } from 'ui'
import { Base, Headline, Description } from './styles'

const AskForPermission = ({ t, permission, onSuccess }) => {
  const onPress = () => request(permission).then(res => {
    if (res !== RESULTS.GRANTED) {
      const buttons = [{ text: t(`AskForPermission:${permission}:alertCancel`), style: 'cancel' }]

      // if (canOpenSettings()) {
      buttons.push({
        text: t(`AskForPermission:${permission}:alertOpen`),
        onPress: () => openSettings(),
      })
      // }

      Alert.alert(
        t(`AskForPermission:${permission}.alertTitle`),
        t(`AskForPermission:${permission}:alertDescription`),
        buttons
      )
    } else {
      onSuccess()
    }
  })

  return (
    <Base>
      <Headline color="white" medium numberOfLines={0}>
        {t(`AskForPermission:${permission}:permissionHeadline`)}
      </Headline>
      <Description color="white" opacity={0.8}>
        {t(`AskForPermission:${permission}:permissionDescription`)}
      </Description>

      <Touchable onPress={onPress}>
        <Text color="white" medium>
          {t(`AskForPermission:${permission}:permissionButton`)}
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
