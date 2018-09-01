import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, Alert } from 'react-native'
import withLocalization from 'i18n/withLocalization'
import { Share, Follow, ActionSheet } from 'ui'
import { Base } from './styles'

const FOOTER_HEIGHT = 90

class Footer extends Component {
  static propTypes = {
    onFollowPress: PropTypes.func.isRequired,
    following: PropTypes.bool.isRequired,
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
    const { t, onFollowPress, name, dynamicLink, following, translateY } = this.props
    const { transformY } = this.state

    return (
      <Animated.View style={{ transform: [{ translateY: transformY }] }}>
        <Animated.View style={{ transform: [{ translateY }] }}>
          <Base>
            <Share title={name} url={dynamicLink} />
            <Follow onPress={onFollowPress} following={following} />
          </Base>
        </Animated.View>
        <ActionSheet
          isOpen={this.state.isOpen}
          onClose={this.toggleActionSheet}
          options={[
            { name: t('.edit'), onSelect: () => Alert('Not yet!') },
            { name: t('.delete'), onSelect: () => Alert('Not yet!') },
            { name: t('.cancel') },
          ]}
        />
      </Animated.View>
    )
  }
}

export default withLocalization(Footer, 'ProjectFooter')
