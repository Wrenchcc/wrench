import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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

  renderItem = ({ item }) => (
    <ProjectCard project={item.node} onPress={() => navigateToProject({ project: item.node })} />
  )

  // TODO: Remove when have IDs
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
        keyExtractor={(item, index) => item.node.id + index}
        renderItem={this.renderItem}
        paddingBottom={20}
        scrollRef={scrollRef}
      />
    )
  }
}

export default compose(searchProjects)(Projects)
