import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Keyboard, TextInput, findNodeHandle } from 'react-native'
import { withNavigation } from 'react-navigation'
import { isIphoneX } from 'utils/platform'

const ADDITIONAL_OFFSET = isIphoneX ? 125 : 95

export default function withKeyboardHandler(WrappedComponent) {
  class WithKeyboardHandler extends PureComponent {
    scrollView = null

    subscriptions = []

    static propTypes = {
      navigation: PropTypes.object.isRequired,
      scrollRef: PropTypes.func,
    }

    constructor(props) {
      super(props)

      props.navigation.addListener('willFocus', () => {
        this.subscriptions = [Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)]
      })

      props.navigation.addListener('willBlur', () => {
        this.subscriptions.forEach(sub => sub.remove())
        Keyboard.dismiss()
      })
    }

    keyboardWillShow = () => {
      const currentlyFocusedField = TextInput.State.currentlyFocusedField()
      const responder = this.scrollView.getScrollResponder()

      if (!currentlyFocusedField || !responder) {
        return
      }

      responder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(currentlyFocusedField),
        ADDITIONAL_OFFSET,
        true
      )
    }

    setRef = el => {
      this.scrollView = el

      if (this.props.scrollRef) {
        this.props.scrollRef(el)
      }
    }

    render = () => <WrappedComponent {...this.props} scrollRef={this.setRef} />
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
  }

  WithKeyboardHandler.displayName = `withKeyboardHandler(${getDisplayName(WrappedComponent)})`

  return withNavigation(WithKeyboardHandler)
}
