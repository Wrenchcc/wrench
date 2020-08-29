import React from 'react'
import { usePaginatedQuery, ProjectsDocument } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { InfiniteList, Title } from 'ui'
import { Header, Footer, Card, GUTTER, SNAP_INTERVAL } from './styles'
import Placeholder from './Placeholder'

function Popular() {
  let content = <Placeholder />

  const { navigate } = useNavigation()
  const { t } = useTranslation()

  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['projects'])(ProjectsDocument, {
    variables: {
      type: 'POPULAR',
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
        image={project.cover}
        title={project.title}
        key={project.id}
        onPress={onPress}
        first={index === 0}
        last={index === edges && edges.length - 1}
        user={project.user}
      />
    )
  }

  if (edges) {
    content = (
      <InfiniteList
        initialNumToRender={3}
        data={edges}
        keyExtractor={(item) => item.node.id}
        horizontal
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        loaderInset={-40}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
        }}
      />
    )
  }

  return (
    <>
      <Header>
        <Title medium>{t('Popular:popular')}</Title>
      </Header>

      {content}

      <Footer>
        <Title medium>{t('Popular:recent')}</Title>
      </Footer>
    </>
  )
}

export default Popular
