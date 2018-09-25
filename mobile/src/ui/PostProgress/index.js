import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { translate } from 'react-i18next'
import { Text } from 'ui'
import { Base, Cover, Content } from './styles'

const HEIGHT = 60

class PostProgress extends PureComponent {
  animatedValue = new Animated.Value(0)

  static propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
  }

  componentWillReceiveProps(nextProps) {
    this.handleToast(!nextProps.image)
  }

  handleToast(hide) {
    Animated.spring(this.animatedValue, {
      toValue: hide ? 0 : HEIGHT,
      bounciness: 0,
    }).start()
  }

  render() {
    const { t, title, image } = this.props

    return (
      <Base style={{ height: this.animatedValue }}>
        {image && <Cover source={{ uri: image }} />}

        <Content>
          <Text numberOfLines={1}>{title}</Text>
          <Text fontSize={15} color="grey">
            {t('PostProgress:description')}
          </Text>
        </Content>
      </Base>
    )
  }
}

export default translate('PostProgress')(PostProgress)
