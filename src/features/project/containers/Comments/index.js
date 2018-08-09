import React, { Component } from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import withLocalization from 'i18n/withLocalization'
import {
  InfiniteList,
  CommentItem,
  CommentField,
  KeyboardAccessoryView,
  Mention,
  HeaderTitle,
} from 'ui'
import { isIphone } from 'utils/platform'
import data from 'fixtures/comments'

let scrollView = null

// TODO: Make platform specific
// TODO: Show latest searched users
// TODO: Remove added user from suggestions
// TODO: Fix title localization
// TODO: Handle multiline
// TODO: Format user data to save [user:1]
const KEYBOARD_OFFSET = isIphone ? 180 : 0
const MENTION_OFFSET_BOTTOM = isIphone ? 240 : 0
const TRIGGER = '@'

class Comments extends Component {
  static navigationOptions = () => ({
    headerTitle: (
      <HeaderTitle onPress={() => scrollView.scrollToOffset({ offset: 0 })}>Comments</HeaderTitle>
    ),
  })

  state = {
    isOpen: false,
    query: '',
    text: '',
  }

  onReply = ({ username }) => {
    this.setState({ text: `${TRIGGER}${username} ` })
    this.commentField.focus()
  }

  onChangeText = text => {
    this.setState({ text })
  }

  onMentionPress = ({ username }) => {
    const comment = this.state.text.slice(0, -this.state.query.length - 1)
    this.setState({ text: `${comment}${TRIGGER}${username} ` })
    this.closeMention()
  }

  onMention = query => {
    this.setState({ query })
  }

  setRef = el => {
    this.commentField = el
  }

  openMention = () => {
    this.setState({ isOpen: true })
  }

  closeMention = () => {
    this.setState({ isOpen: false })
    this.commentField.stopTracking()
  }

  handleSubmit = () => {
    // TODO: Submit and add to list
  }

  componentWillUnmont() {
    scrollView = null
  }

  render = () => (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        enabled={isIphone}
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={KEYBOARD_OFFSET}
      >
        {this.state.isOpen && (
          <Mention
            query={this.state.query}
            onNoResults={this.closeMention}
            onPress={this.onMentionPress}
            offsetBottom={MENTION_OFFSET_BOTTOM}
            offsetTop={0}
          />
        )}

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
      </KeyboardAvoidingView>

      <KeyboardAccessoryView style={{ paddingLeft: 20, paddingRight: 20 }}>
        <CommentField
          onRef={this.setRef}
          onSubmitEditing={this.onSubmitEditing}
          onChangeText={this.onChangeText}
          onMention={this.onMention}
          onSubmit={this.handleSubmit}
          value={this.state.text}
          openMention={this.openMention}
          closeMention={this.closeMention}
          disabled={this.state.text.length === 0}
        />
      </KeyboardAccessoryView>
    </View>
  )
}

export default withLocalization(Comments, 'Comments')
