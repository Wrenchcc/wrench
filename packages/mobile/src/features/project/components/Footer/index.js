import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { Share, Follow } from 'ui'
import { Base } from './styles'

export default class Footer extends PureComponent {
  static propTypes = {
    onFollowPress: PropTypes.func.isRequired,
    following: PropTypes.bool.isRequired,
    isOwner: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    dynamicLink: PropTypes.string.isRequired,
    translateY: PropTypes.object.isRequired,
  }

  state = {
    isOpen: false,
  }

  toggleActionSheet = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }

  render() {
    const { onFollowPress, name, dynamicLink, following, isOwner, translateY } = this.props

    return (
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Base>
          <Share title={name} url={dynamicLink} />
          {!isOwner && <Follow onPress={onFollowPress} following={following} />}
        </Base>
      </Animated.View>
    )
  }
}
