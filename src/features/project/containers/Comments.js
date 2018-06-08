import React, { Component } from 'react'
import { View, Keyboard, KeyboardAvoidingView } from 'react-native'
import {
  FlatList,
  CommentItem,
  CommentField,
  KeyboardAccessoryView,
  Mention,
  HeaderTitle,
} from 'ui'
import data from 'fixtures/comments'

// TODO: Handle scroll to better
let scrollView = null

// TODO: Make platform specific
// TODO: Show latest searched users
// TODO: Remove added user from suggestions
const KEYBOARD_OFFSET = 190
const REGX_PATTERN = '\\@[a-z0-9_-]+|\\@'
const TRIGGER = '@'

export default class Comments extends Component {
  static navigationOptions = () => ({
    headerTitle: (
      <HeaderTitle onPress={() => scrollView.scrollToOffset({ offset: 0 })}>Comments</HeaderTitle>
    ),
  })

  state = {
    reply: null,
    mention: null,
    text: '',
    isOpen: false,
  }

  onReply = userName => {
    this.textInput.focus()
    this.onChangeText(`@${userName} `)
  }

  onChangeText = text => {
    this.identifyKeyword(text)
    this.setState({ text })
  }

  setRef = el => {
    this.textInput = el
  }

  componentWillUnmont() {
    scrollView = null
  }

  identifyKeyword = text => {
    const lastChar = text.substr(text.length - 1)
    const pattern = new RegExp(REGX_PATTERN, 'gi')
    const keywordArray = text.match(pattern)
    if (keywordArray && !!keywordArray.length) {
      const mention = keywordArray[keywordArray.length - 1]
      this.setState({ mention })

      if (lastChar === TRIGGER) {
        this.openMention()
      } else {
        this.closeMention()
      }
    }
  }

  openMention = () => this.setState({ isOpen: true })

  closeMention = selected => {
    if (!selected) return
    const { text, mention } = this.state
    const newText = text.replace(mention, `@${selected.userName} `)
    this.setState({ text: newText, mention: null, isOpen: false })
  }

  handleSubmit = () => {
    // TODO: Submit and add to list
    this.onChangeText('')
    this.closeMention()
    Keyboard.dismiss()
  }

  render = () => (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={KEYBOARD_OFFSET}
      >
        {this.state.isOpen ? (
          <Mention onPress={this.closeMention} query={this.state.mention.replace(TRIGGER, '')} />
        ) : (
          <FlatList
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
