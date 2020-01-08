import React from 'react'
import { usePaginatedQuery, ProjectsDocument } from '@wrench/common'
import { Page, FlatList, useNavigation, SCREENS } from 'navigation'
import { ProjectCard } from 'ui'

const ITEM_HEIGHT = 200

function getItemLayout(_, index) {
  return {
    index,
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
  }
}

function Categories({ id, title }) {
  const { navigate } = useNavigation()

  const { projects, isFetching, fetchMore, isRefetching, hasNextPage, refetch } = usePaginatedQuery(
    'projects'
  )(ProjectsDocument, {
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
        initialNumToRender={4}
        paddingBottom={40}
        getItemLayout={getItemLayout}
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
