import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Page, FlatList } from 'navigation'
import CommentField from 'components/CommentField'
import { CommentItem, KeyboardAccessoryView } from 'ui'
import { isIphone } from 'utils/platform'

const COMMENT_FIELD_OFFSET = isIphone ? 140 : 40

// TODO: FIX
function Comments({ postId }) {
  return null
  const { t } = useTranslation()
  const [commentId, setCommentId] = useState()
  const [username, setUsername] = useState()

  const handleOnReply = useCallback(
    data => {
      setCommentId(data.commentId)
      setUsername(data.username)
    },
    [setCommentId, setUsername]
  )

  const renderHeader = () => {
    if (!post) {
      return null
    }

    return (
      <CommentItem
        first
        fetchMoreReplies={fetchMoreReplies}
        data={{
          node: {
            ...post,
            text: post.caption,
          },
        }}
      />
    )
  }

  const renderItem = ({ item }) => (
    <CommentItem
      data={item}
      onReply={handleOnReply}
      fetchMoreReplies={fetchMoreReplies}
      postId={post.id}
    />
  )

  return (
    <Page
      headerAnimation={false}
      headerTitle={t('Comments:title')}
      stickyFooter={
        <KeyboardAccessoryView extraHeight={50}>
          <CommentField postId={postId} username={username} commentId={commentId} emoji />
        </KeyboardAccessoryView>
      }
    >
      <FlatList
        paddingHorizontal={0}
        paddingBottom={COMMENT_FIELD_OFFSET}
        ListHeaderComponent={renderHeader}
        data={comments}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default Comments
