import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { pathOr } from 'ramda'
import { compose } from 'react-apollo'
import { InfiniteList, ProjectCard } from 'ui'
import { searchProjects } from 'graphql/queries/project/searchProjects'
import { navigateToProject } from 'navigation'
import { Base, Title, Description } from './styles'

// TODO: Add followingProjects query and Copy
class FollowingProjects extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    projects: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

  headerComponent = () => {
    const { t, user } = this.props

    return (
      <Fragment>
        <Title>{t('FollowingProjects:title')}</Title>
        <Description>{t('FollowingProjects:description', { name: user.firstName })}</Description>
      </Fragment>
    )
  }

  renderItem = ({ item }) => (
    <ProjectCard
      {...item.node}
      images={pathOr(null, ['node', 'images', 'edges'], item)}
      onPress={() => navigateToProject({ project: item.node })}
    />
  )

  render() {
    const { projects, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props

    return (
      <Base>
        <InfiniteList
          ListHeaderComponent={this.headerComponent}
          data={projects}
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          keyExtractor={(item, index) => item.node.id + index}
          renderItem={this.renderItem}
        />
      </Base>
    )
  }
}

export default compose(
  searchProjects,
  translate('FollowingProjects')
)(FollowingProjects)
