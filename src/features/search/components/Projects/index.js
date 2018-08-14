import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { navigateToProject } from 'navigation'
import { searchProjects } from 'graphql/queries/searchProjects'
import { ProjectCard, InfiniteList } from 'ui'

class Projects extends PureComponent {
  static propTypes = {
    projects: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

  // TODO: pass correct data and new coverImages list
  renderItem = ({ item }) => (
    <ProjectCard
      {...item.node}
      images={[item.node.coverImage]}
      onPress={() => navigateToProject(item.node)}
    />
  )

  render() {
    const { projects, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props

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
      />
    )
  }
}

export default compose(searchProjects)(Projects)
