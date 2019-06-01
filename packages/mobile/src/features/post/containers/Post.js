import React, { PureComponent, Fragment } from 'react'
import { View } from 'react-native'
import { compose } from 'react-apollo'
import { pathOr } from 'ramda'
import { PageLayout, FlatList } from 'navigation'
import withTranslation from 'i18n/withTranslation'
import { getComment } from 'graphql/queries/comment/getComment'
import { getComments } from 'graphql/queries/comment/getComments'
import { addComment } from 'graphql/mutations/comment/addComment'
import { Post, CommentItem, CommentField, KeyboardAccessoryView, Mention } from 'ui'
import { isIphone, hasNotch } from 'utils/platform'

// TODO: Make platform specific
const SAFE_AREA = hasNotch ? 10 : 0
const MENTION_OFFSET_BOTTOM = isIphone ? 340 + SAFE_AREA : 0
const TRIGGER = '@'

class PostContainer extends PureComponent {
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
        // scrollView.scrollToIndex({ animated: true, index: 0 })
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

  renderItem = ({ item }) => (
    <CommentItem
      data={item}
      highlightId={pathOr('', ['comment', 'id'], this.props)}
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
      <View style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 10 }}>
        <Post post={post} withoutComments />
      </View>
    )
  }

  render() {
    const {
      t,
      comments,
      fetchMore,
      refetch,
      isRefetching,
      isFetching,
      hasNextPage,
      post,
    } = this.props

    return (
      <Fragment>
        {this.state.isOpen && (
          <Mention
            offsetTop={90}
            query={this.state.query}
            onPress={this.onMentionPress}
            offsetBottom={MENTION_OFFSET_BOTTOM}
          />
        )}
        <PageLayout
          headerTitle={t('PostContainer:title')}
          headerAnimation={false}
          footer={
            <KeyboardAccessoryView>
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
          }
        >
          <FlatList
            initialNumToRender={6}
            contentContainerStyle={{
              paddingTop: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }}
            ListHeaderComponent={this.renderHeader}
            data={comments}
            refetch={refetch}
            fetchMore={fetchMore}
            isRefetching={isRefetching}
            isFetching={!post || isFetching}
            hasNextPage={hasNextPage}
            renderItem={this.renderItem}
          />
        </PageLayout>
      </Fragment>
    )
  }
}

export default compose(
  getComments,
  getComment,
  addComment,
  withTranslation('PostContainer')
)(PostContainer)
