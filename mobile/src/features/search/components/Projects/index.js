import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { navigateToProject } from 'navigation'
import { searchProjects } from 'graphql/queries/project/searchProjects'
import { ProjectCard, InfiniteList } from 'ui'

class Projects extends PureComponent {
  static propTypes = {
    fetchMore: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    projects: PropTypes.array,
    refetch: PropTypes.func.isRequired,
    scrollRef: PropTypes.func.isRequired,
  }

  renderItem = ({ item }) => (
    <ProjectCard project={item.node} onPress={() => navigateToProject({ project: item.node })} />
  )

  // TODO: Remove when have IDs
  render() {
    const {
      fetchMore,
      hasNextPage,
      isFetching,
      isRefetching,
      projects,
      refetch,
      scrollRef,
    } = this.props

    return (
      <InfiniteList
        borderSeparator
        data={projects}
        fetchMore={fetchMore}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        isRefetching={isRefetching}
        keyExtractor={(item, index) => item.node.id + index}
        paddingBottom={20}
        refetch={refetch}
        renderItem={this.renderItem}
        scrollRef={scrollRef}
      />
    )
  }
}

export default compose(searchProjects)(Projects)
