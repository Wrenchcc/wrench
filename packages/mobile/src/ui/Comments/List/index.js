import React from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import { slice } from 'ramda'
import { useNavigation, SCREENS } from 'navigation'
import Text from 'ui/Text'
import { Base, Row, Comment, LoadMore } from './styles'

function List({ data, t }) {
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

  const renderComment = ({ node }) => (
    <Row key={node.id}>
      <Text bold fontSize={15} onPress={() => navigateToUser(node.user.id)}>
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

// class List extends PureComponent {
//   static propTypes = {
//     data: PropTypes.object,
//   }
//
//   goToComments = () => {
//     navigateToComments({ id: this.props.data.id })
//   }
//
//   goToProfile = user => {
//     navigateToUser({ user })
//   }
//
// renderComment = ({ node }) => (
//   <Row key={node.id}>
//     <Text bold fontSize={15} onPress={() => this.goToProfile(node.user)}>
//       {`${node.user.fullName} `}
//     </Text>
//     <Comment fontSize={15} numberOfLines={1} lineHeight={22}>
//       {node.text}
//     </Comment>
//   </Row>
// )
//
//   render() {
//     const { data, t } = this.props
//     if (!data.comments.edges.length) return null
//
// return (
//   <Base>
//     {slice(0, 2, data.comments.edges).map(this.renderComment)}
//     <LoadMore onPress={this.goToComments}>
//       <Text fontSize={15} color="light_grey">
//         {t('List:loadMore', { count: data.comments.totalCount })}
//       </Text>
//     </LoadMore>
//   </Base>
// )
//   }
// }

export default withTranslation('List')(List)
