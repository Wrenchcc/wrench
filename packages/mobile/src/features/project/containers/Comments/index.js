import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, KeyboardAvoidingView } from 'react-native'
import { compose } from 'react-apollo'
import { getComments } from 'graphql/queries/comment/getComments'
import { addComment } from 'graphql/mutations/comment/addComment'
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
    addComment: PropTypes.func.isRequired,
    comments: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    fetchMoreReplies: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    post: PropTypes.object,
  }

  state = {
    commentId: null,
    isOpen: false,
    query: '',
    text: '',
  }

  onReply = (user, commentId) => {
    this.setState({
      commentId,
      text: `${TRIGGER}${user.username} `,
    })
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
    const { text, commentId } = this.state
    this.setState({ text: '', commentId: null })
    this.props.addComment(text, commentId)
  }

  componentWillUnmont() {
    scrollView = null
  }

  renderItem = ({ item }) => (
    <CommentItem
      data={item}
      onReply={this.onReply}
      fetchMoreReplies={this.props.fetchMoreReplies}
    />
  )

  render() {
    const { comments, fetchMore, refetch, isRefetching, isFetching, hasNextPage, post } = this.props

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
            />
          )}

          <InfiniteList
            scrollRef={ref => {
              scrollView = ref
            }}
            contentContainerStyle={{
              paddingTop: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }}
            ListHeaderComponent={
              post && (
                <CommentItem
                  first
                  data={{
                    node: {
                      ...post,
                      text: post.caption,
                    },
                  }}
                />
              )
            }
            keyExtractor={item => item.node.id}
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

export default compose(
  getComments,
  addComment
)(Comments)
