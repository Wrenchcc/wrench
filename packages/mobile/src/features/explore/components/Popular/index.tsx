import React from 'react'
import { View } from 'react-native'
import { usePaginatedQuery, ProjectsDocument } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { InfiniteList, Title } from 'ui'
import { Header, Footer, Card, GUTTER, SNAP_INTERVAL } from './styles'
import Skeleton from './SkeletonList'

function Popular() {
  const { navigate } = useNavigation()
  const { t } = useTranslation('popular')

  const {
    data: { edges },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['projects'])(ProjectsDocument, {
    variables: {
      type: 'POPULAR',
      first: 8,
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

  const ListEmptyComponent = isFetching && <Skeleton />

  return (
    <View style={{ height: 460 }}>
      <Header>
        <Title medium>{t('popular')}</Title>
      </Header>

      <InfiniteList
        initialNumToRender={3}
        ListEmptyComponent={ListEmptyComponent}
        data={edges}
        horizontal
        paddingVertical={0}
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        fetchMore={fetchMore}
        loaderInset={35}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
        }}
      />

      <Footer>
        <Title medium>{t('recent')}</Title>
      </Footer>
    </View>
  )
}

export default Popular
