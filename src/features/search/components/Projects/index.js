import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { pathOr } from 'ramda'
import { compose } from 'react-apollo'
import { navigateToProject } from 'navigation'
import { searchProjects } from 'graphql/queries/project/searchProjects'
import { ProjectCard, InfiniteList } from 'ui'

class Projects extends PureComponent {
  static propTypes = {
    projects: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    scrollRef: PropTypes.func.isRequired,
  }

  renderItem = ({ item }) => {
    const params = {
      user: item.node.user,
      project: {
        id: item.node.id,
        title: item.node.title,
        followers: item.node.followers,
        projectPermissions: item.node.projectPermissions,
      },
    }

    return (
      <ProjectCard
        {...item.node}
        images={pathOr(null, ['node', 'images', 'edges'], item)}
        onPress={() => navigateToProject(params)}
      />
    )
  }

  render() {
    const {
      projects,
      fetchMore,
      refetch,
      isRefetching,
      isFetching,
      hasNextPage,
      scrollRef,
    } = this.props

    return (
      <InfiniteList
        borderSeparator
        data={projects}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        keyExtractor={item => item.node.id}
        renderItem={this.renderItem}
        paddingBottom={20}
        scrollRef={scrollRef}
      />
    )
  }
}

export default compose(searchProjects)(Projects)
