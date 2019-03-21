import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { navigateToProject } from 'navigation/actions'
import { searchProjects } from 'graphql/queries/project/searchProjects'
import { ProjectCard, InfiniteList, NoResults, SearchingFor } from 'ui'

const ITEM_HEIGHT = 200

class Projects extends PureComponent {
  static propTypes = {
    fetchMore: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    projects: PropTypes.array,
    refetch: PropTypes.func.isRequired,
    scrollRef: PropTypes.func.isRequired,
    query: PropTypes.string,
  }

  getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })

  renderItem = ({ item }) => (
    <ProjectCard project={item.node} onPress={() => navigateToProject({ project: item.node })} />
  )

  render() {
    const {
      fetchMore,
      hasNextPage,
      isFetching,
      isRefetching,
      projects,
      refetch,
      scrollRef,
      query,
    } = this.props

    return (
      <InfiniteList
        borderSeparator
        paddingBottom={40}
        getItemLayout={this.getItemLayout}
        ListEmptyComponent={!isFetching && <NoResults />}
        data={projects}
        fetchMore={fetchMore}
        hasNextPage={isFetching ? false : hasNextPage}
        isFetching={isFetching && query.length === 0}
        isRefetching={isRefetching}
        keyExtractor={item => item.node.id}
        refetch={refetch}
        renderItem={this.renderItem}
        scrollRef={scrollRef}
        defaultPadding
        ListFooterComponent={
          (query.length === 1 && !projects) || (isFetching && query.length !== 0) ? (
            <SearchingFor query={query} />
          ) : null
        }
      />
    )
  }
}

export default compose(searchProjects)(Projects)
