import React from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { navigateToUser } from 'navigation/actions'
import Avatar from 'ui/Avatar'
import Text from 'ui/Text'
import TimeAgo from 'ui/TimeAgo'
import { COLORS } from 'ui/constants'
import { Base, Content, Row, Reply, LoadReplies, Border } from './styles'

const Item = ({
  createdAt,
  first = false,
  highlightedId = null,
  id,
  isReply,
  onReply,
  t,
  text,
  user,
}) => {
  const animatedValue = new Animated.Value(0)
  if (id === highlightedId) {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
    }).start(() => {
      Animated.timing(animatedValue, {
        toValue: 0,
        delay: 1000,
      }).start()
    })
  }

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.WHITE, COLORS.ULTRA_LIGHT_GREY],
  })

  if (!user) return null

  return (
    <Animated.View style={{ backgroundColor }}>
      <Base isReply={isReply} first={first}>
        <Avatar
          uri={user.avatarUrl}
          size={isReply ? 20 : 30}
          isOnline={user.isOnline}
          badgeSize={isReply && 'small'}
          onPress={() => navigateToUser({ user })}
        />
        <Content>
          <Row style={{ flexDirection: 'column' }}>
            <Text fontSize={15} bold>
              {`${user.fullName} `}
              <Text fontSize={15}>{text}</Text>
            </Text>
          </Row>
          <Row>
            <TimeAgo date={createdAt} />
            {!first && (
              <Reply medium fontSize={12} onPress={() => onReply(user, id)} disabled={id < 0}>
                {t('CommentItem:reply')}
              </Reply>
            )}
          </Row>
        </Content>
      </Base>
    </Animated.View>
  )
}

Item.propTypes = {
  createdAt: PropTypes.string.isRequired,
  first: PropTypes.bool,
  highlightedId: PropTypes.string,
  id: PropTypes.string.isRequired,
  isReply: PropTypes.bool,
  onReply: PropTypes.func,
  text: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
}

const CommentItem = ({ t, data, onReply, fetchMoreReplies, first }) => data.node.replies ? (
    <>
      <Item {...data.node} onReply={onReply} t={t} highlightedId={highlightedId} />
      {data.node.replies.edges.map(({ node }) => (
        <Item
          key={node.id}
          isReply
          {...node}
          id={node.commentId}
          t={t}
          onReply={onReply}
          highlightedId={highlightedId}
        />
      ))}

      {data.node.replies.pageInfo.hasNextPage && (
        <LoadReplies>
          <Border />
          <Text
            medium
            fontSize={12}
            color="light_grey"
            hapticFeedback="impactLight"
            onPress={() => fetchMoreReplies(
              data.node.id,
              data.node.replies.edges[data.node.replies.edges.length - 1].cursor
            )
            }
          >
            {t('CommentItem:loadReplies', {
              count: data.node.replies.totalCount - data.node.replies.edges.length,
            })}
          </Text>
        </LoadReplies>
      )}
    </>
) : (
    <Item {...data.node} t={t} first={first} onReply={onReply} />
)

CommentItem.propTypes = {
  data: PropTypes.object.isRequired,
  fetchMoreReplies: PropTypes.func,
  first: PropTypes.bool,
  onReply: PropTypes.func,
}

export default withNamespaces('CommentItem')(CommentItem)
