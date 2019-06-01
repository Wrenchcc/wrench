import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { compose } from 'react-apollo'
import { pathOr } from 'ramda'
import { PageLayout, FlatList } from 'navigation'
import withTranslation from 'i18n/withTranslation'
import { getComment } from 'graphql/queries/comment/getComment'
import { getComments } from 'graphql/queries/comment/getComments'
import CommentField from 'components/CommentField'
import { Post, CommentItem, KeyboardAccessoryView } from 'ui'

class PostContainer extends PureComponent {
  // componentDidUpdate(prevProps) {
  //   const { comments, isFetching, isRefetching } = this.props
  //   if (
  //     pathOr(false, ['isRefetching'], prevProps) === isRefetching
  //     && pathOr(false, ['isFetching'], prevProps) === isFetching
  //     && !isFetching
  //     && comments
  //     && comments.length >= 1
  //   ) {
  //     setTimeout(() => {
  //       // scrollView.scrollToIndex({ animated: true, index: 0 })
  //     }, 100)
  //   }
  // }

  onReply = (user, commentId) => {
    // this.setState({
    //   commentId,
    //   text: `${TRIGGER}${user.username} `,
    // })
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
      <PageLayout
        headerTitle={t('PostContainer:title')}
        headerAnimation={false}
        stickyFooter={
          <KeyboardAccessoryView>
            <CommentField postId={post.id} />
          </KeyboardAccessoryView>
        }
      >
        <FlatList
          initialNumToRender={6}
          contentContainerStyle={{
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 60,
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
    )
  }
}

export default compose(
  getComments,
  getComment,
  withTranslation('PostContainer')
)(PostContainer)
