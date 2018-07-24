import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import Permissions from 'react-native-permissions'
import withLocalization from 'i18n/withLocalization'
import { Touchable, Text } from 'ui'
import { Base, Headline, Description } from './styles'

const AUTHORIZED = 'authorized'

const AskForPermission = ({ t, permission, onSuccess }) => {
  const onPress = () => Permissions.request(permission).then(res => {
    if (res !== AUTHORIZED) {
      const buttons = [{ text: t(`.${permission}.alertCancel`), style: 'cancel' }]

      if (Permissions.canOpenSettings()) {
        buttons.push({
          text: t(`.${permission}.alertOpen`),
          onPress: () => Permissions.openSettings(),
        })
      }

      Alert.alert(t(`.${permission}.alertTitle`), t(`.${permission}.alertDescription`), buttons)
    } else {
      onSuccess()
    }
  })

  return (
    <Base>
      <Headline color="white" medium numberOfLines={0}>
        {t(`.${permission}.permissionHeadline`)}
      </Headline>
      <Description color="white" opacity={0.8}>
        {t(`.${permission}.permissionDescription`)}
      </Description>

      <Touchable onPress={onPress}>
        <Text color="white" medium>
          {t(`.${permission}.permissionButton`)}
        </Text>
      </Touchable>
    </Base>
  )
}

AskForPermission.propTypes = {
  permission: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
}

export default withLocalization(AskForPermission, 'AskForPermission')
