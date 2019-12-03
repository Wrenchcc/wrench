import React from 'react'
import { Page, FlatList, useNavigation, SCREENS } from 'navigation'
import { usePaginatedQuery, GET_PROJECTS } from 'gql'
import { ProjectCard } from 'ui'

function Categories({ id, title }) {
  const { navigate } = useNavigation()

  const { projects, isFetching, fetchMore, isRefetching, hasNextPage, refetch } = usePaginatedQuery(
    'projects'
  )(GET_PROJECTS, {
    variables: {
      first: 6,
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

  return (
    <Page headerTitle={title} headerAnimation={false}>
      <FlatList
        initialNumToRender={3}
        data={projects}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default Categories
