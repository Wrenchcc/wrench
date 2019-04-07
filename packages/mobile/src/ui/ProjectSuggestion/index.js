import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { navigateToProject } from 'navigation-old/actions'
import InfiniteList from 'ui/InfiniteList'
import { Title, ProjectCard, GUTTER, BAR_SPACE, width } from './styles'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

export default class ProjectSuggestion extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string.isRequired,
    fetchMore: PropTypes.func,
    refetch: PropTypes.func,
    isRefetching: PropTypes.bool,
    isFetching: PropTypes.bool,
    hasNextPage: PropTypes.bool,
  }

  renderItem = ({ item, index }) => (
    <ProjectCard
      first={index === 0}
      last={index === this.props.data.length - 1}
      project={item.node}
      onPress={() => navigateToProject({ project: item.node })}
    />
  )

  render() {
    const { title, data, refetch, fetchMore, isRefetching, isFetching, hasNextPage } = this.props

    return (
      <>
        <Title fontSize={21}>{title}</Title>

        <InfiniteList
          keyExtractor={item => item.node.id}
          data={data}
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          horizontal
          directionalLockEnabled
          paddingHorizontal={0}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          style={{
            marginLeft: -GUTTER,
            marginRight: -GUTTER,
          }}
        />
      </>
    )
  }
}
