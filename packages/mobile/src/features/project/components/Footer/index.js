import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { Share, Follow } from 'ui'
import { Base } from './styles'

const FOOTER_HEIGHT = 90

export default class Footer extends Component {
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
    transformY: new Animated.Value(FOOTER_HEIGHT),
  }

  componentDidMount() {
    this.slideIn()
  }

  componentWillUnmount() {
    this.slideOut()
  }

  toggleActionSheet = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }

  slideIn() {
    Animated.spring(this.state.transformY, {
      toValue: 0,
      duration: 1000,
      delay: 400,
      useNativeDriver: true,
    }).start()
  }

  slideOut() {
    Animated.spring(this.state.transformY, {
      toValue: 0,
      duration: 500,
      delay: 0,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const { onFollowPress, name, dynamicLink, following, isOwner, translateY } = this.props
    const { transformY } = this.state

    return (
      <Animated.View style={{ transform: [{ translateY: transformY }] }}>
        <Animated.View style={{ transform: [{ translateY }] }}>
          <Base>
            <Share title={name} url={dynamicLink} />
            {!isOwner && <Follow onPress={onFollowPress} following={following} />}
          </Base>
        </Animated.View>
      </Animated.View>
    )
  }
}
