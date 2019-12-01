import React from 'react'
import { Dimensions } from 'react-native'
import { Page, FlatList, useNavigation, SCREENS } from 'navigation'
import { usePaginatedQuery, GET_PROJECTS } from 'gql'
import { Card } from 'ui'

const { width } = Dimensions.get('window')

const GUTTER = 30
const ITEM_SIZE = width / 2 - GUTTER

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

  const renderItem = ({ item, index }) => {
    const project = item.node

    const onPress = () =>
      navigate(SCREENS.PROJECT, {
        id: project.id,
        project,
      })

    return (
      <Card
        style={{ paddingBottom: 20, paddingLeft: 10, paddingRight: 10 }}
        size={ITEM_SIZE}
        image={project.cover}
        title={project.title}
        key={project.id}
        onPress={onPress}
        first={index === 0}
        last={index === projects && projects.length - 1}
        user={project.user}
      />
    )
  }

  return (
    <Page headerTitle={title} headerAnimation={false}>
      <FlatList
        paddingHorizontal={10}
        initialNumToRender={3}
        numColumns={2}
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
