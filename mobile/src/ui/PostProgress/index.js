import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { compose } from 'react-apollo'
import { translate } from 'react-i18next'
import { PostContainer, withState } from 'state'
import { Text, ProgressBar } from 'ui'
import { Base, Inner, Cover, Content } from './styles'

const HEIGHT = 60

class PostProgress extends PureComponent {
  animatedHeight = new Animated.Value(0)

  static propTypes = {
    image: PropTypes.string,
    progress: PropTypes.number,
    title: PropTypes.string,
  }

  componentDidUpdate() {
    this.handleAnimation(!this.props.image)
  }

  handleAnimation(hide) {
    Animated.spring(this.animatedHeight, {
      toValue: hide ? 0 : HEIGHT,
      bounciness: 0,
    }).start()
  }

  render() {
    const { t, title, image, progress = 0 } = this.props

    return (
      <Base style={{ height: this.animatedHeight }}>
        <Inner>
          {image && <Cover source={{ uri: image }} />}

          <Content>
            <Text numberOfLines={1}>{title}</Text>
            <Text fontSize={15} color="grey">
              {t('PostProgress:description')}
            </Text>
          </Content>
        </Inner>

        <ProgressBar
          barHeight={2}
          progress={progress}
          fillColor="black"
          backgroundColor="transparent"
        />
      </Base>
    )
  }
}

// TODO: HoC for Subscribe
export default compose(
  withState(PostContainer),
  translate('PostProgress')
)(PostProgress)
