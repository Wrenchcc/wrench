import React, { Component } from 'react'
import { Animated } from 'react-native'
import { translate } from 'react-i18next'
import { Text } from 'ui'
import { COLORS, TOTAL_HEADER_HEIGHT } from 'ui/constants'
import { Base, Cover, Middle, Content } from './styles'

const HEIGHT = 60
const DURATION = 300

class Posting extends Component {
  animatedValue = new Animated.Value(0)

  componentDidMount() {
    this.handleToast(false)

    setTimeout(() => this.handleToast(true), 3000)
  }

  componentWillUnmount() {
    this.handleToast(true)
  }

  handleToast(hide) {
    Animated.timing(this.animatedValue, {
      toValue: hide ? 0 : HEIGHT,
      duration: DURATION,
    }).start()
  }

  render() {
    const { t, title, image } = this.props
    return (
      <Animated.View
        style={{
          height: this.animatedValue,
          backgroundColor: COLORS.DIVIDER,
        }}
      >
        <Base>
          <Cover source={{ uri: image }} />

          <Content>
            <Text numberOfLines={1}>{title}</Text>
            <Text fontSize={15} color="grey">
              {t('Posting:description')}
            </Text>
          </Content>
        </Base>
      </Animated.View>
    )
  }
}

export default translate('Posting')(Posting)
