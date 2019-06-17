import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { compose } from 'react-apollo'
import { Page, FlatList } from 'navigation'
import Post from 'components/Post'
import { getComment } from 'graphql/queries/comment/getComment'
import { getComments } from 'graphql/queries/comment/getComments'
import CommentField from 'components/CommentField'
import { CommentItem, KeyboardAccessoryView } from 'ui'

// TODO: Platform specific
const COMMENT_FIELD_OFFSET = 90

// TODO: Load comment in top
function PostContainer({
  comments,
  comment,
  fetchMore,
  refetch,
  isRefetching,
  isFetching,
  hasNextPage,
  post,
  fetchMoreReplies,
  postId,
}) {
  const { t } = useTranslation()

  const [mention, setMention] = useState({
    commentId: null,
    username: null,
  })

  const handleOnReply = useCallback(data => setMention(data), [])

  const renderItem = ({ item }) => (
    <CommentItem
      data={item}
      highlightId={comment.id}
      onReply={handleOnReply}
      fetchMoreReplies={fetchMoreReplies}
    />
  )

  const renderHeader = () => {
    if (!post) {
      return null
    }

    return (
      <View style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 10 }}>
        <Post post={post} withoutComments />
      </View>
    )
  }

  return (
    <Page
      scrollToIndex={!!comments}
      headerTitle={t('PostContainer:title')}
      headerAnimation={false}
      stickyFooter={
        <KeyboardAccessoryView>
          <CommentField postId={postId} username={mention.username} commentId={mention.commentId} />
        </KeyboardAccessoryView>
      }
    >
      <FlatList
        initialNumToRender={6}
        paddingHorizontal={0}
        paddingBottom={COMMENT_FIELD_OFFSET}
        ListHeaderComponent={renderHeader}
        data={comments}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={!post || isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default compose(
  getComments,
  getComment
)(PostContainer)
