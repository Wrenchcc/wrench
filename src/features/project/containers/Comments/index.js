import React, { Component } from 'react'
import { View, Keyboard, KeyboardAvoidingView } from 'react-native'
import withLocalization from 'i18n/withLocalization'
import {
  InfiniteList,
  CommentItem,
  CommentField,
  KeyboardAccessoryView,
  Mention,
  HeaderTitle,
} from 'ui'
import data from 'fixtures/comments'

let scrollView = null

// TODO: Make platform specific
// TODO: Show latest searched users
// TODO: Remove added user from suggestions
// TODO: Fix title localization
// TODO: Close when no users found
// Add mention style to save
const KEYBOARD_OFFSET = 190
const PATTERN = '\\@[a-z0-9_-]+|\\@'
const TRIGGER = '@'
const EMPTY = ' '

class Comments extends Component {
  static navigationOptions = () => ({
    headerTitle: (
      <HeaderTitle onPress={() => scrollView.scrollToOffset({ offset: 0 })}>Comments</HeaderTitle>
    ),
  })

  previousChar = ' '

  isTrackingStarted = false

  state = {
    reply: null,
    isOpen: false,
    keyword: '',
    text: '',
  }

  onReply = ({ userName }) => {
    this.textInput.focus()
    this.setState({ text: `@${userName} ` })
  }

  onChangeText = text => {
    this.setState({ text })
    const lastChar = text.substr(text.length - 1)
    if (lastChar === TRIGGER) {
      this.startTracking()
    } else if ((lastChar === EMPTY && this.isTrackingStarted) || text === '') {
      this.stopTracking()
    }
    this.previousChar = lastChar
    this.identifyKeyword(text)
  }

  onMention = ({ userName }) => {
    const comment = this.state.text.slice(0, -this.state.keyword.length)
    this.setState({ text: `${comment}@${userName} ` })
    this.stopTracking()
  }

  setRef = el => {
    this.textInput = el
  }

  identifyKeyword = text => {
    if (this.isTrackingStarted) {
      const pattern = new RegExp(PATTERN, 'gi')
      const keywordArray = text.match(pattern)
      if (keywordArray && !!keywordArray.length) {
        const lastKeyword = keywordArray[keywordArray.length - 1]
        this.setState({ keyword: lastKeyword })
        this.openMention()
      }
    }
  }

  startTracking = () => {
    this.isTrackingStarted = true
    this.openMention()
  }

  stopTracking = () => {
    this.isTrackingStarted = false
    this.closeMention()
  }

  openMention = () => {
    this.setState({ isOpen: true })
  }

  closeMention = () => {
    this.setState({ isOpen: false })
  }

  handleSubmit = () => {
    // TODO: Submit and add to list
    this.onChangeText('')
    this.closeMention()
    Keyboard.dismiss()
  }

  componentWillUnmont() {
    scrollView = null
  }

  render = () => (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={KEYBOARD_OFFSET}
      >
        {this.state.isOpen ? (
          <Mention onPress={this.onMention} query={this.state.keyword.replace(TRIGGER, '')} />
        ) : (
          <InfiniteList
            scrollRef={ref => {
              scrollView = ref
            }}
            contentContainerStyle={{
              paddingLeft: 0,
              paddingRight: 0,
            }}
            keyExtractor={item => item.id}
            data={data}
            renderItem={({ item }) => <CommentItem item={item} onReply={this.onReply} />}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="none"
            defaultPaddingTop
          />
        )}
      </KeyboardAvoidingView>

      <KeyboardAccessoryView
        alwaysVisible
        hideBorder
        style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}
      >
        <CommentField
          reply={this.state.reply}
          onSubmitEditing={this.onSubmitEditing}
          onChangeText={this.onChangeText}
          onSubmit={this.handleSubmit}
          disabled={this.state.text.length === 0}
          value={this.state.text}
          inputRef={this.setRef}
        />
      </KeyboardAccessoryView>
    </View>
  )
}

export default withLocalization(Comments, 'Comments')
