import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { slice } from 'ramda'
import { navigateToUser, navigateToComments } from 'navigation'
import Text from 'ui/Text'
import { Row, Comment, LoadMore } from './styles'

class List extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
  }

  goToComments = () => {
    const { id } = this.props.data
    navigateToComments({ id })
  }

  goToProfile = user => {
    navigateToUser({ user })
  }

  renderComment = ({ node }) => (
    <Row key={node.id}>
      <Text bold fontSize={15} onPress={() => this.goToProfile(node.user)}>
        {`${node.user.fullName} `}
      </Text>
      <Comment fontSize={15} numberOfLines={1} lineHeight={22}>
        {node.text}
      </Comment>
    </Row>
  )

  render() {
    const { data, t } = this.props
    if (!data.comments.edges.length) return null

    return (
      <>
        {slice(0, 2, data.comments.edges).map(this.renderComment)}
        <LoadMore onPress={this.goToComments}>
          <Text fontSize={15} color="light_grey">
            {t('List:loadMore', { count: data.comments.totalCount })}
          </Text>
        </LoadMore>
      </>
    )
  }
}

export default withNamespaces('List')(List)
