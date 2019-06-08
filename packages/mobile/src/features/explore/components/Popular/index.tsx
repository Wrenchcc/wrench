import React from 'react'
import { useTranslation } from 'react-i18next'
import { pathOr } from 'ramda'
import { getPopularProjects } from 'graphql/queries/getExplore'
import { useNavigation, SCREENS } from 'navigation'
import { InfiniteList, Title } from 'ui'
import { Header, Footer, Card, GUTTER, SNAP_INTERVAL } from './styles'

function Popular({ projects, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const { navigate } = useNavigation()
  const { t } = useTranslation()

  const renderItem = ({ item, index }) => {
    const project = item.node
    const image = pathOr(null, ['files', 'edges', [0], 'node'], project)

    return (
      <Card
        image={image}
        title={project.title}
        key={project.id}
        onPress={() => navigate(SCREENS.PROJECT, { slug: project.slug })}
        first={index === 0}
        last={index === projects && projects.length - 1}
        user={project.user}
      />
    )
  }

  return (
    <>
      <Header>
        <Title medium>{t('Popular:popular')}</Title>
      </Header>
      <InfiniteList
        initialNumToRender={2}
        data={projects}
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
        hasNextPage={hasNextPage}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
        }}
      />
      <Footer>
        <Title medium>{t('Popular:recent')}</Title>
      </Footer>
    </>
  )
}

export default getPopularProjects(Popular)
