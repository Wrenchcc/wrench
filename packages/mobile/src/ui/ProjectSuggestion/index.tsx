import React from 'react'
import { Dimensions } from 'react-native'
import { useNavigation, SCREENS } from 'navigation'
import Title from 'ui/Title'
import InfiniteList from 'ui/InfiniteList'
import * as Spacing from 'ui/Spacing'

const { width } = Dimensions.get('window')

const GUTTER = 20
const BAR_SPACE = GUTTER / 2
const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

const styles = {
  title: {
    marginBottom: 20,
  },
  card: {
    width: width - GUTTER * 2,
  },
}

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
        style={[
          styles.card,
          {
            marginRight: index === data.length - 1 ? GUTTER : BAR_SPACE,
            marginLeft: index === 0 ? GUTTER : 0,
          },
        ]}
        onFollow={onFollow}
        project={item.node}
        onPress={onPress}
      />
    )
  }

  return (
    <>
      <Title fontSize={21} style={styles.title}>
        {title}
      </Title>

      <InfiniteList
        paddingVertical={0}
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
