import React, { Fragment } from 'react'
import { useNavigation, SCREENS } from 'navigation'
import InfiniteList from 'ui/InfiniteList'
import { Title, ProjectCard, GUTTER, BAR_SPACE, width } from './styles'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

function ProjectSuggestion({
  title,
  data,
  refetch,
  fetchMore,
  isRefetching,
  isFetching,
  hasNextPage,
}) {
  const { navigate } = useNavigation()

  return (
    <Fragment>
      <Title fontSize={21}>{title}</Title>

      <InfiniteList
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
        renderItem={({ item, index }) => (
          <ProjectCard
            first={index === 0}
            last={index === data.length - 1}
            project={item.node}
            onPress={() => navigate(SCREENS.PROJECT, { slug: item.node.slug })}
          />
        )}
        showsVerticalScrollIndicator={false}
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
        }}
      />
    </Fragment>
  )
}

export default ProjectSuggestion
