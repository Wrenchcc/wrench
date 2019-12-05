import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { slice } from 'rambda'
import { useNavigation, SCREENS } from 'navigation'
import Text from 'ui/Text'
import { Base, Row, Comment, LoadMore } from './styles'

function List({ data }) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const navigateToComments = useCallback(
    () =>
      navigate(SCREENS.COMMENTS, {
        postId: data.id,
      }),
    [data]
  )

  const renderComment = ({ node }) => {
    const onPress = () => navigate(SCREENS.USER, { user: node.user })

    return (
      <Row key={node.id}>
        <Text bold fontSize={15} onPress={onPress}>
          {`${node.user.fullName} `}
        </Text>
        <Comment fontSize={15} numberOfLines={1} lineHeight={22}>
          {node.text}
        </Comment>
      </Row>
    )
  }

  if (!data.comments.edges.length) {
    return null
  }

  return (
    <>
      {slice(0, 2, data.comments.edges).map(renderComment)}
      <LoadMore onPress={navigateToComments}>
        <Text fontSize={15} color="light_grey">
          {t('List:loadMore', { count: data.comments.totalCount })}
        </Text>
      </LoadMore>
    </>
  )
}

export default List
