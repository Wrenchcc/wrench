import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { slice } from 'ramda'
import { useNavigation, SCREENS } from 'navigation'
import Text from 'ui/Text'
import { Base, Row, Comment, LoadMore } from './styles'

function List({ data }) {
  if (!data.comments.edges.length) {
    return null
  }

  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const navigateToComments = useCallback(
    () =>
      navigate(SCREENS.COMMENTS, {
        postId: data.id,
      }),
    [data]
  )

  const renderComment = ({ node }) => (
    <Row key={node.id}>
      <Text
        bold
        fontSize={15}
        onPress={() => navigate(SCREENS.USER, { username: node.user.username })}
      >
        {`${node.user.fullName} `}
      </Text>
      <Comment fontSize={15} numberOfLines={1} lineHeight={22}>
        {node.text}
      </Comment>
    </Row>
  )

  return (
    <Base>
      {slice(0, 2, data.comments.edges).map(renderComment)}
      <LoadMore onPress={navigateToComments}>
        <Text fontSize={15} color="light_grey">
          {t('List:loadMore', { count: data.comments.totalCount })}
        </Text>
      </LoadMore>
    </Base>
  )
}

export default List
