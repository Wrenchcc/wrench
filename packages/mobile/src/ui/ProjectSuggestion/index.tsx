import React from 'react'
import { useNavigation, SCREENS } from 'navigation'
import InfiniteList from 'ui/InfiniteList'
import * as Spacing from 'ui/Spacing'
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
  onFollow,
  disabled,
}) {
  const { navigate } = useNavigation()

  const renderItem = ({ item, index }) => {
    const onPress = () =>
      !disabled &&
      navigate(SCREENS.PROJECT, {
        id: item.node.id,
        project: item.node,
      })

    return (
      <ProjectCard
        onFollow={onFollow}
        first={index === 0}
        last={index === data.length - 1}
        project={item.node}
        onPress={onPress}
      />
    )
  }

  return (
    <>
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
        loaderInset={-280}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
        }}
      />

      <Spacing.Horizontally px={40} />
    </>
  )
}

export default ProjectSuggestion
