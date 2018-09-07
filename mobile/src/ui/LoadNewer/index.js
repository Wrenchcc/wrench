import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { translate } from 'react-i18next'
import { Text } from 'ui'
import { Button, HEIGHT, TOP } from './styles'

const DURATION = 650

class LoadNewer extends PureComponent {
  transformY = new Animated.Value(-HEIGHT - TOP)

  static propTypes = {
    onPress: PropTypes.func.isRequired,
  }

  componentDidMount() {
    Animated.spring(this.transformY, {
      toValue: TOP,
      duration: DURATION,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const { t, onPress } = this.props

    return (
      <Animated.View
        style={{
          transform: [{ translateY: this.transformY }],
          position: 'absolute',
          alignSelf: 'center',
          zIndex: 10,
        }}
      >
        <Button onPress={onPress}>
          <Text color="white" fontSize={15} medium>
            {t('LoadNewer:button')}
          </Text>
        </Button>
      </Animated.View>
    )
  }
}

export default translate('LoadNewer')(LoadNewer)
