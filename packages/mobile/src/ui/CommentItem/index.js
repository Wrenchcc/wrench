import React from 'react'
import { Animated } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { navigateToUser } from 'navigation/actions'
import Avatar from 'ui/Avatar'
import Text from 'ui/Text'
import TimeAgo from 'ui/TimeAgo'
import { COLORS } from 'ui/constants'
import { Base, Content, Row, Reply, LoadReplies, Border } from './styles'

const Item = ({
  id,
  user,
  text,
  isReply,
  onReply,
  createdAt,
  highlightedId = null,
  t,
  first = false,
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
    outputRange: [COLORS.WHITE, COLORS.BEIGE],
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

const CommentItem = props => props.data.node.replies ? (
    <>
      <Item {...props.data.node} onReply={props.onReply} t={props.t} />
      {props.data.node.replies.edges.map(({ node }) => (
        <Item
          key={node.id}
          isReply
          {...node}
          id={node.commentId}
          t={props.t}
          onReply={props.onReply}
        />
      ))}

      {props.data.node.replies.pageInfo.hasNextPage && (
        <LoadReplies>
          <Border />
          <Text
            medium
            fontSize={12}
            color="light_grey"
            hapticFeedback="impactLight"
            onPress={() => props.fetchMoreReplies(props.data.node.id, props.data.cursor)}
          >
            {props.t('CommentItem:loadReplies', {
              count: props.data.node.replies.totalCount - props.data.node.replies.edges.length,
            })}
          </Text>
        </LoadReplies>
      )}
    </>
) : (
    <Item {...props.data.node} t={props.t} first={props.first} onReply={props.onReply} />
)

export default withNamespaces('CommentItem')(CommentItem)
