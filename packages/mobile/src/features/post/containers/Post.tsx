import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  usePaginatedQuery,
  useCommentQuery,
  usePostQuery,
  CommentsDocument,
  useRepliesLazyQuery,
} from '@wrench/common'
import { isEmpty } from 'rambda'
import { Page, FlatList } from 'navigation'
import Post from 'components/Post'
import CommentField from 'components/CommentField'
import { CommentItem, KeyboardAccessoryView } from 'ui'
import { isIphone } from 'utils/platform'

const COMMENT_FIELD_OFFSET = isIphone ? 140 : 40

// TODO: Load passed comment in top
function PostContainer({ postId, commentId }) {
  const { t } = useTranslation()

  const [mention, setMention] = useState({
    commentId: null,
    username: null,
  })

  const [loadReplies] = useRepliesLazyQuery()

  const fetchMoreReplies = (id, after) =>
    loadReplies({
      variables: {
        after,
        id,
      },
    })

  const { data: commentData } = useCommentQuery({
    variables: {
      id: commentId,
    },
  })

  const { data: postData } = usePostQuery({
    variables: {
      id: postId,
    },
  })

  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['comments'])(CommentsDocument, {
    variables: {
      postId,
    },
  })

  const highlightId = commentData && commentData.comment.id

  const handleOnReply = useCallback(data => setMention(data), [setMention])

  const renderItem = ({ item }) => (
    <CommentItem
      data={item}
      highlightId={highlightId}
      onReply={handleOnReply}
      fetchMoreReplies={fetchMoreReplies}
      postId={postId}
    />
  )

  const renderHeader = () => {
    if (!postData) {
      return null
    }

    return (
      <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
        <Post post={postData.post} withoutComments paddingBottom={10} numberOfLines={0} />
      </View>
    )
  }

  return (
    <Page
      scrollToIndex={edges && !isEmpty(edges)}
      headerTitle={t('PostContainer:title')}
      headerAnimation={false}
      stickyFooter={
        <KeyboardAccessoryView extraHeight={50}>
          <CommentField
            postId={postId}
            username={mention.username}
            commentId={mention.commentId}
            emoji
          />
        </KeyboardAccessoryView>
      }
    >
      <FlatList
        initialNumToRender={6}
        paddingHorizontal={0}
        paddingBottom={COMMENT_FIELD_OFFSET}
        ListHeaderComponent={renderHeader}
        data={edges}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={!postData || isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default PostContainer
