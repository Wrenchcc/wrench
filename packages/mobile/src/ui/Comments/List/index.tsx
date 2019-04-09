import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { slice } from 'ramda'
import { useNavigation, SCREENS } from 'navigation'
import Text from 'ui/Text'
import { Base, Row, Comment, LoadMore } from './styles'

function List({ data }) {
  const { t } = useTranslation()
  if (!data.comments.edges.length) {
    return null
  }

  const { navigate } = useNavigation()
  const navigateToUser = id => navigate(SCREENS.USER, {
    id,
  })

  const navigateToComments = () => navigate(SCREENS.COMMENTS, {
    postId: data.id,
  })

  return (
    <Base>
      {slice(0, 2, data.comments.edges).map(({ node }) => (
        <Row key={node.id}>
          <Text bold fontSize={15} onPress={() => navigateToUser(node.user.id)}>
            {`${node.user.fullName} `}
          </Text>
          <Comment fontSize={15} numberOfLines={1} lineHeight={22}>
            {node.text}
          </Comment>
        </Row>
      ))}
      <LoadMore onPress={navigateToComments}>
        <Text fontSize={15} color="light_grey">
          {t('List:loadMore', { count: data.comments.totalCount })}
        </Text>
      </LoadMore>
    </Base>
  )
}

List.propTypes = {
  data: PropTypes.object.isRequired,
}

export default List
