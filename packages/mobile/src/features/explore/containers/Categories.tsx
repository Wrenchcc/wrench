import React from 'react'
import { usePaginatedQuery, ProjectsDocument } from '@wrench/common'
import { Page, FlatList, useNavigation, SCREENS } from 'navigation'
import { ProjectCard } from 'ui'
import SkeletonList from 'ui/ProjectCard/SkeletonList'

function Categories({ id, title }) {
  const { navigate } = useNavigation()

  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['projects'])(ProjectsDocument, {
    variables: {
      typeId: id,
      type: 'RECENT',
    },
  })

  const renderItem = ({ item }) => {
    const project = item.node

    const onPress = () =>
      navigate(SCREENS.PROJECT, {
        id: project.id,
        project,
      })

    return <ProjectCard project={project} onPress={onPress} />
  }

  const ListEmptyComponent = isFetching && <SkeletonList />

  return (
    <Page headerTitle={title} disableAnimation>
      <FlatList
        ListEmptyComponent={ListEmptyComponent}
        initialNumToRender={4}
        data={edges}
        refetch={refetch}
        isFetching={edges && isFetching}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
        ItemSeparatorComponentStyle={{ paddingTop: 10, marginBottom: 10 }}
      />
    </Page>
  )
}

export default Categories
