import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import withTranslation from 'i18n/withTranslation'
import Text from 'ui/Text'
import { Button, HEIGHT, TOP } from './styles'

const DURATION = 650
const DELAY = 3000

class LoadNewer extends PureComponent {
  transformY = new Animated.Value(-HEIGHT - TOP)

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
  }

  componentDidMount() {
    Animated.spring(this.transformY, {
      toValue: TOP,
      duration: DURATION,
      useNativeDriver: true,
    }).start(() => {
      Animated.sequence([
        Animated.delay(DELAY),
        Animated.spring(this.transformY, {
          toValue: -HEIGHT - TOP,
          duration: DURATION / 2,
          useNativeDriver: true,
        }),
      ]).start()
    })
  }

  handleOnPress = () => {
    this.props.onPress()
    Animated.spring(this.transformY, {
      toValue: -50,
      delay: 50,
      duration: DURATION,
      useNativeDriver: true,
    }).start(this.props.hide)
  }

  render() {
    const { t } = this.props

    return (
      <Animated.View
        style={{
          transform: [{ translateY: this.transformY }],
          position: 'absolute',
          alignSelf: 'center',
          zIndex: 10,
        }}
      >
        <Button onPress={this.handleOnPress}>
          <Text color="white" fontSize={15} medium>
            {t('LoadNewer:button')}
          </Text>
        </Button>
      </Animated.View>
    )
  }
}

export default withTranslation('LoadNewer')(LoadNewer)
