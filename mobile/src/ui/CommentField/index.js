import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Keyboard } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { COLORS } from 'ui/constants'
import { Text } from 'ui'
import { isIphone } from 'utils/platform'
import { Base, Input, Button } from './styles'

const PATTERN = '\\@[a-z0-9_-]+|\\@'
const TRIGGER = '@'
const EMPTY = ' '

class CommentField extends PureComponent {
  textInput = React.createRef()

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onMention: PropTypes.func.isRequired,
    openMention: PropTypes.func.isRequired,
    closeMention: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onRef: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.onRef(this)
    const keyboardHideEvent = isIphone ? 'keyboardWillHide' : 'keyboardDidHide'

    // Hide mention when scrolling parent list ie keyboard hides
    this.keyboardHideEventListener = Keyboard.addListener(
      keyboardHideEvent,
      this.props.closeMention
    )
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
    this.keyboardHideEventListener.remove()
  }

  onChangeText = text => {
    this.props.onChangeText(text)

    const lastChar = text.substr(text.length - 1)

    if (lastChar === TRIGGER) {
      this.startTracking()
      this.props.openMention()
    } else if ((lastChar === EMPTY && this.isTrackingStarted) || text === '') {
      this.stopTracking()
      this.props.closeMention()
    }

    this.identifyKeyword(text)
  }

  focus = () => {
    this.textInput.current.focus()
  }

  startTracking = () => {
    this.isTrackingStarted = true
  }

  stopTracking = () => {
    this.isTrackingStarted = false
  }

  identifyKeyword = text => {
    if (this.isTrackingStarted) {
      const pattern = new RegExp(PATTERN, 'gi')
      const keywordArray = text.match(pattern)
      if (keywordArray && !!keywordArray.length) {
        const lastKeyword = keywordArray[keywordArray.length - 1]
        this.props.onMention(lastKeyword.replace(TRIGGER, ''))
        this.props.openMention()
      }
    }
  }

  handleSubmit = () => {
    this.onChangeText('')
    this.props.onSubmit()
    Keyboard.dismiss()
  }

  render() {
    const { t, disabled, onSubmit, onChangeText, ...props } = this.props
    return (
      <Base>
        <Input
          placeholder={t('CommentField:placeholder')}
          placeholderTextColor={COLORS.LIGHT_GREY}
          keyboardType="twitter"
          onSubmitEditing={(!this.props.value.length === 0 && this.onSubmitEditing) || null}
          onChangeText={this.onChangeText}
          value={this.props.value}
          color="dark"
          inputRef={this.textInput}
          {...props}
        />
        {!disabled && (
          <Button onPress={this.handleSubmit}>
            <Text medium>{t('CommentField:post')}</Text>
          </Button>
        )}
      </Base>
    )
  }
}

export default withNamespaces('CommentField')(CommentField)
