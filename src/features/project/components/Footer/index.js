import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, Alert } from 'react-native'
import { Share, Follow, ActionSheet } from 'ui'
import { Base } from './styles'

const FOOTER_HEIGHT = 90

// TODO: Translate
export default class Footer extends Component {
  static propTypes = {
    onFollowPress: PropTypes.func.isRequired,
    following: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    translateY: PropTypes.object.isRequired,
  }

  state = {
    isOpen: false,
    transformY: new Animated.Value(FOOTER_HEIGHT),
  }

  options = [
    { name: 'Edit post', onSelect: () => Alert('Not yet!') },
    { name: 'Delete post', onSelect: () => Alert('Not yet!') },
    { name: 'Cancel' },
  ]

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
    const { onFollowPress, name, slug, following, translateY } = this.props
    const { transformY } = this.state

    return (
      <Animated.View style={{ transform: [{ translateY: transformY }] }}>
        <Animated.View style={{ transform: [{ translateY }] }}>
          <Base>
            <Share title={name} slug={`project/${slug}`} />
            <Follow onPress={onFollowPress} following={following} />
          </Base>
        </Animated.View>
        <ActionSheet
          isOpen={this.state.isOpen}
          onClose={this.toggleActionSheet}
          options={this.options}
        />
      </Animated.View>
    )
  }
}
