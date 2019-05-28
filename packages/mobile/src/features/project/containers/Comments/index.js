import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import withTranslation from 'i18n/withTranslation'
import { PageLayout, FlatList } from 'navigation'
import { getComments } from 'graphql/queries/comment/getComments'
import { addComment } from 'graphql/mutations/comment/addComment'
import { CommentItem, CommentField, KeyboardAccessoryView, Mention } from 'ui'
import { isIphone, hasNotch } from 'utils/platform'

// TODO: Make platform specific
const SAFE_AREA = hasNotch ? 10 : 0
const MENTION_OFFSET_BOTTOM = isIphone ? 340 + SAFE_AREA : 0
const TRIGGER = '@'

class Comments extends PureComponent {
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
      <CommentItem
        first
        fetchMoreReplies={this.props.fetchMoreReplies}
        data={{
          node: {
            ...post,
            text: post.caption,
          },
        }}
      />
    )
  }

  render() {
    const { t, comments, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props

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
          headerAnimation={false}
          headerTitle={t('Comments:title')}
          footer={
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
          }
        >
          <FlatList
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
        </PageLayout>
      </Fragment>
    )
  }
}

export default compose(
  getComments,
  addComment,
  withTranslation('Comments')
)(Comments)
