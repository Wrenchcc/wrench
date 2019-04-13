import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, KeyboardAvoidingView } from 'react-native'
import { compose } from 'react-apollo'
import { pathOr } from 'ramda'
import { getComment } from 'graphql-old/queries/comment/getComment'
import { getComments } from 'graphql-old/queries/comment/getComments'
import { addComment } from 'graphql-old/mutations/comment/addComment'
import {
  Post,
  InfiniteList,
  CommentItem,
  CommentField,
  KeyboardAccessoryView,
  Mention,
  HeaderTitle,
} from 'ui'
import { isIphone, isNotchIPhone } from 'utils/platform'

let scrollView = null

// TODO: Make platform specific
const SAFE_AREA = isNotchIPhone ? 10 : 0
const KEYBOARD_OFFSET = isIphone ? 180 + SAFE_AREA : 0
const MENTION_OFFSET_BOTTOM = isIphone ? 240 + SAFE_AREA : 0
const TRIGGER = '@'

class PostContainer extends PureComponent {
  static navigationOptions = ({ screenProps }) => ({
    headerTitle: (
      <HeaderTitle onPress={() => scrollView.scrollToOffset({ offset: 0 })}>
        {screenProps.t('PostContainer:title')}
      </HeaderTitle>
    ),
  })

  static propTypes = {
    addComment: PropTypes.func.isRequired,
    comments: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    fetchMoreReplies: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    post: PropTypes.object,
    refetch: PropTypes.func.isRequired,
  }

  state = {
    commentId: null,
    isOpen: false,
    query: '',
    text: '',
  }

  componentDidUpdate(prevProps) {
    const { comments, isFetching, isRefetching } = this.props
    if (
      pathOr(false, ['isRefetching'], prevProps) === isRefetching
      && pathOr(false, ['isFetching'], prevProps) === isFetching
      && !isFetching
      && comments
      && comments.length >= 1
    ) {
      setTimeout(() => {
        scrollView.scrollToIndex({ animated: true, index: 0 })
      }, 100)
    }
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

  renderItem = ({ item }) => (
    <CommentItem
      data={item}
      highlightId={pathOr('', ['commentId'], this.props)}
      onReply={this.onReply}
      fetchMoreReplies={this.props.fetchMoreReplies}
    />
  )

  renderHeader = () => {
    const { post } = this.props

    if (!post) {
      return null
    }

    return (
      <View style={{ marginBottom: 10 }}>
        <Post post={post} withoutComments />
      </View>
    )
  }

  render() {
    const { comments, fetchMore, refetch, isRefetching, isFetching, hasNextPage, post } = this.props

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
            isFetching={!post || isFetching}
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
)(PostContainer)
