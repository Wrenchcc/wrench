import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withLocalization from 'i18n/withLocalization'
import { COLORS } from 'ui/constants'
import Text from 'ui/Text'
import { Base, Input, Button } from './styles'

class CommentField extends Component {
  static propTypes = {
    // triggerLocation: PropTypes.oneOf(['new-word-only', 'anywhere']).isRequired,
    // value: PropTypes.string.isRequired,
    // onChangeText: PropTypes.func.isRequired,
    // triggerCallback: PropTypes.func.isRequired,
    // suggestionsData: PropTypes.array.isRequired,
    // suggestionRowHeight: PropTypes.number.isRequired,
    // MaxVisibleRowCount: PropTypes.func,
    // onSubmit: PropTypes.func,
    // disabled: PropTypes.bool,
    // inputRef: PropTypes.func,
  }

  state = {
    isTrackingStarted: false,
    previousChar: ' ',
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.value) {
      this.resetTextbox()
    } else if (this.state.isTrackingStarted && nextProps.suggestionsData.length !== 0) {
      console.log('here')
    }
  }

  onChangeText = val => {
    this.props.onChangeText(val)
    const lastChar = val.substr(val.length - 1)
    const wordBoundry = this.props.triggerLocation === 'new-word-only'
      ? this.state.previousChar.trim().length === 0
      : true
    if (lastChar === '@' && wordBoundry) {
      this.startTracking()
    } else if ((lastChar === ' ' && this.state.isTrackingStarted) || val === '') {
      this.stopTracking()
    }
    this.setState({ previousChar: lastChar })
    this.identifyKeyword(val)
  }

  identifyKeyword(val) {
    if (this.state.isTrackingStarted) {
      const boundary = this.props.triggerLocation === 'new-word-only' ? 'B' : ''
      const pattern = new RegExp(`\\${boundary}@[a-z0-9_-]+|\\${boundary}@`, 'gi')
      const keywordArray = val.match(pattern)
      if (keywordArray && !!keywordArray.length) {
        const lastKeyword = keywordArray[keywordArray.length - 1]
        this.updateSuggestions(lastKeyword)
      }
    }
  }

  updateSuggestions(lastKeyword) {
    this.props.triggerCallback(lastKeyword)
  }

  startTracking = () => {
    this.setState({ isTrackingStarted: true })
  }

  stopTracking = () => {
    this.setState({ isTrackingStarted: false })
  }

  resetTextbox() {
    this.setState({ previousChar: ' ' })
    this.stopTracking()
  }

  render() {
    const { t, disabled, onSubmit, inputRef, ...props } = this.props
    return (
      <Base>
        <Input
          placeholder={t('.placeholder')}
          placeholderTextColor={COLORS.LIGHT_GREY}
          onSubmitEditing={(!disabled && onSubmit) || null}
          keyboardType="twitter"
          inputRef={inputRef}
          {...props}
        />
        {!disabled && (
          <Button onPress={onSubmit}>
            <Text medium>{t('.post')}</Text>
          </Button>
        )}
      </Base>
    )
  }
}

export default withLocalization(CommentField, 'CommentField')
