import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import Item from './Item'
import { LoadReplies, Border } from './styles'

function CommentItem({ data, onReply, fetchMoreReplies, first, highlightId }) {
  const { t } = useTranslation()
  const replies = data.node.replies
  const commentId = data.node.id

  const handleLoadMore = useCallback(
    () => fetchMoreReplies(commentId, replies.edges[replies.edges.length - 1].cursor),
    [commentId]
  )

  return replies ? (
    <>
      <Item {...data.node} onReply={onReply} t={t} highlightId={highlightId} />
      {replies.edges.map(({ node }) => (
        <Item
          key={node.id}
          isReply
          {...node}
          commentId={commentId}
          t={t}
          onReply={onReply}
          highlightId={highlightId}
        />
      ))}

      {replies.totalCount > replies.edges.length && (
        <LoadReplies>
          <Border />
          <Text medium fontSize={12} color="light_grey" onPress={handleLoadMore}>
            {t('CommentItem:loadReplies', {
              count: replies.totalCount - replies.edges.length,
            })}
          </Text>
        </LoadReplies>
      )}
    </>
  ) : (
    <Item {...data.node} t={t} first={first} onReply={onReply} highlightId={highlightId} />
  )
}

export default memo(CommentItem)
