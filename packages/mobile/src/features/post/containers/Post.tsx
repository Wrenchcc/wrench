import React, { useState, useEffect, useCallback, useRef } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { compose } from 'react-apollo'
import { PageLayout, FlatList } from 'navigation'
import { getComment } from 'graphql/queries/comment/getComment'
import { getComments } from 'graphql/queries/comment/getComments'
import CommentField from 'components/CommentField'
import { Post, CommentItem, KeyboardAccessoryView } from 'ui'

// TODO: Load comment in top and scroll
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
  const scrollRef = useRef()
  const { t } = useTranslation()

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     // scrollRef.current.scrollToIndex({ animated: true, index: 0 })
  //   }
  // }, [scrollRef])

  const [mention, setMention] = useState({
    username: null,
    commentId: null,
  })

  const handleOnReply = useCallback(data => setMention(data), [])

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
    <PageLayout
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
        contentContainerStyle={{
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 60,
        }}
        ListHeaderComponent={renderHeader}
        data={comments}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={!post || isFetching}
        hasNextPage={hasNextPage}
        renderItem={({ item }) => (
          <CommentItem
            data={item}
            highlightId={comment.id}
            onReply={handleOnReply}
            fetchMoreReplies={fetchMoreReplies}
          />
        )}
      />
    </PageLayout>
  )
}

export default compose(
  getComments,
  getComment
)(PostContainer)
