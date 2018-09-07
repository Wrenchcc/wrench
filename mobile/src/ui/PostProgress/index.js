import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { translate } from 'react-i18next'
import { Text } from 'ui'
import { COLORS } from 'ui/constants'
import { Base, Cover, Content } from './styles'

const HEIGHT = 60
const DURATION = 300

class PostProgress extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  animatedValue = new Animated.Value(0)

  componentDidMount() {
    this.handleToast(false)
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
              {t('PostProgress:description')}
            </Text>
          </Content>
        </Base>
      </Animated.View>
    )
  }
}

export default translate('PostProgress')(PostProgress)
