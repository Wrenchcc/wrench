import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { navigateToUser, navigateToComments } from 'navigation'
import withLocalization from 'i18n/withLocalization'
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
      <Comment fontSize={15} numberOfLines={1}>
        {node.text}
      </Comment>
    </Row>
  )

  render() {
    const { data, t } = this.props
    return (
      <Fragment>
        {data.comments.edges.map(this.renderComment)}
        <LoadMore onPress={this.goToComments}>
          <Text fontSize={15} color="light_grey">
            {t('.loadMore', { count: data.comments.totalCount })}
          </Text>
        </LoadMore>
      </Fragment>
    )
  }
}

export default withLocalization(List, 'List')
