import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import PlatformColor from 'ui/PlatformColor'
import Text from 'ui/Text'
import Item from './Item'

const styles = {
  load: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 60,
    marginBottom: 10,
  },
  border: {
    width: 20,
    height: 1,
    backgroundColor: PlatformColor.divider,
    marginRight: 10,
  },
}

function CommentItem({ data, onReply, fetchReplies, first, highlightId, postId }) {
  const { t } = useTranslation('comment-item')
  const replies = data.node.replies
  const commentId = data.node.id

  const handleLoadMore = useCallback(
    () =>
      fetchReplies({
        id: commentId,
        after: replies.edges[replies.edges.length - 1].cursor,
      }),
    [commentId]
  )

  return replies ? (
    <>
      {replies.edges.map(({ node }) => (
        <Item
          key={node.id}
          isReply
          {...node}
          commentId={commentId}
          onReply={onReply}
          highlightId={highlightId}
          postId={postId}
        />
      ))}

      {replies.totalCount > replies.edges.length && (
        <View style={styles.load}>
          <View style={styles.border} />
          <Text medium fontSize={12} color="accent" onPress={handleLoadMore}>
            {t('loadReplies', {
              count: replies.totalCount - replies.edges.length,
            })}
          </Text>
        </View>
      )}

      <Item {...data.node} onReply={onReply} t={t} highlightId={highlightId} postId={postId} />
    </>
  ) : (
    <Item
      {...data.node}
      first={first}
      onReply={onReply}
      highlightId={highlightId}
      postId={postId}
    />
  )
}

export default CommentItem
