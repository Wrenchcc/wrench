import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { getPopularProjects } from 'graphql/queries/getExplore'
import withLocalization from 'i18n/withLocalization'
import { navigateToProject } from 'navigation'
import { InfiniteList } from 'ui'
import { INITIAL_POSTS_COUNT } from '../../constants'
import { Title, Card, GUTTER, BAR_SPACE, width } from './styles'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

class Popular extends PureComponent {
  static propTypes = {
    projects: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

  renderItem = ({ item, index }) => {
    const { projects } = this.props
    const { coverImage, id, title, user, followers, projectPermissions } = item.node

    const params = {
      user,
      project: {
        id,
        title,
        followers,
        projectPermissions,
      },
    }

    return (
      <Card
        coverUri={coverImage.uri}
        title={title}
        key={id}
        onPress={() => navigateToProject(params)}
        first={index === 0}
        last={index === projects && projects.length - 1}
      />
    )
  }

  render() {
    const { projects, fetchMore, refetch, isRefetching, isFetching, hasNextPage, t } = this.props

    return (
      <Fragment>
        <Title medium>{t('.popular')}</Title>
        <InfiniteList
          initialNumToRender={INITIAL_POSTS_COUNT}
          keyExtractor={item => item.node.id}
          data={projects}
          horizontal
          directionalLockEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          style={{
            marginLeft: -GUTTER,
            marginRight: -GUTTER,
          }}
        />
        <Title medium>{t('.recent')}</Title>
      </Fragment>
    )
  }
}

export default compose(getPopularProjects)(withLocalization(Popular, 'Popular'))
