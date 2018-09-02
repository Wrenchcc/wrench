import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, KeyboardAvoidingView } from 'react-native'
import { compose } from 'react-apollo'
import { getComments } from 'graphql/queries/post/getComments'
import {
  InfiniteList,
  CommentItem,
  CommentField,
  KeyboardAccessoryView,
  Mention,
  HeaderTitle,
} from 'ui'
import { isIphone } from 'utils/platform'

let scrollView = null

// TODO: Make platform specific
// TODO: Show latest searched users
// TODO: Remove added user from suggestions
// TODO: Handle multiline
const KEYBOARD_OFFSET = isIphone ? 180 : 0
const MENTION_OFFSET_BOTTOM = isIphone ? 240 : 0
const TRIGGER = '@'

class Comments extends Component {
  static navigationOptions = ({ screenProps }) => ({
    headerTitle: (
      <HeaderTitle onPress={() => scrollView.scrollToOffset({ offset: 0 })}>
        {screenProps.t('Comments:title')}
      </HeaderTitle>
    ),
  })

  static propTypes = {
    comments: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

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

  renderItem = ({ item }) => <CommentItem item={item.node} onReply={this.onReply} />

  // TODO: Remove when have IDs
  render() {
    const { comments, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props

    return (
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
            keyExtractor={(item, index) => item.node.id + index}
            data={comments}
            refetch={refetch}
            fetchMore={fetchMore}
            isRefetching={isRefetching}
            isFetching={isFetching}
            hasNextPage={hasNextPage}
            renderItem={this.renderItem}
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
}

export default compose(getComments)(Comments)
