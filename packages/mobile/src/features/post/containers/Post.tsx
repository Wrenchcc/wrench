import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { compose, isEmpty } from 'rambda'
import { Page, FlatList } from 'navigation'
import Post from 'components/Post'
import { getComment } from 'graphql/queries/comment/getComment'
import { getComments } from 'graphql/queries/comment/getComments'
import CommentField from 'components/CommentField'
import { CommentItem, KeyboardAccessoryView } from 'ui'
import { isIphone } from 'utils/platform'

const COMMENT_FIELD_OFFSET = isIphone ? 140 : 40

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

  const highlightId = comment && comment.id

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
    if (!post) {
      return null
    }

    return (
      <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
        <Post post={post} withoutComments paddingBottom={10} numberOfLines={0} />
      </View>
    )
  }

  return (
    <Page
      scrollToIndex={comments && !isEmpty(comments)}
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

export default compose(getComments, getComment)(PostContainer)
