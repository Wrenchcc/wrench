import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, KeyboardAvoidingView } from 'react-native'
import { pathOr } from 'ramda'
import { compose } from 'react-apollo'
import { getComments } from 'graphql/queries/comment/getComments'
import { getComment } from 'graphql/queries/comment/getComment'
import { addComment } from 'graphql/mutations/comment/addComment'
import {
  InfiniteList,
  CommentItem,
  CommentField,
  KeyboardAccessoryView,
  Mention,
  HeaderTitle,
} from 'ui'
import { isIphone, isIphoneX } from 'utils/platform'

let scrollView = null

// TODO: Make platform specific
const SAFE_AREA = isIphoneX ? 10 : 0
const KEYBOARD_OFFSET = isIphone ? 180 + SAFE_AREA : 0
const MENTION_OFFSET_BOTTOM = isIphone ? 240 + SAFE_AREA : 0
const TRIGGER = '@'

class Comments extends PureComponent {
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
    comment: PropTypes.object,
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
    this.commentField.focus()
    this.setState({
      commentId,
      text: `${TRIGGER}${user.username} `,
    })
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

  renderItem = ({ item }) => {
    // Remove comment item from list to skip dublicated
    if (pathOr(false, ['comment', 'id'], this.props) === item.node.id) {
      return null
    }

    return (
      <CommentItem
        data={item}
        onReply={this.onReply}
        fetchMoreReplies={this.props.fetchMoreReplies}
      />
    )
  }

  renderHeader = () => {
    let content

    const { post, comment } = this.props

    if (!post) {
      return null
    }

    if (comment) {
      content = (
        <CommentItem
          highlight
          onReply={this.onReply}
          data={{
            node: comment,
          }}
        />
      )
    }

    return (
      <>
        <CommentItem
          first
          data={{
            node: {
              ...post,
              text: post.caption,
            },
          }}
        />
        {content}
      </>
    )
  }

  render() {
    const { comments, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props

    return (
      <View style={{ flex: 1, marginBottom: SAFE_AREA }}>
        <KeyboardAvoidingView
          enabled={isIphone}
          behavior="padding"
          style={{ flex: 1 }}
          keyboardVerticalOffset={KEYBOARD_OFFSET}
        >
          {this.state.isOpen && (
            <Mention
              offsetTop={0}
              query={this.state.query}
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
            ListHeaderComponent={this.renderHeader}
            keyExtractor={item => item.node.id}
            data={comments}
            refetch={refetch}
            fetchMore={fetchMore}
            isRefetching={isRefetching}
            isFetching={isFetching}
            hasNextPage={hasNextPage}
            renderItem={this.renderItem}
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
  getComment,
  addComment
)(Comments)
