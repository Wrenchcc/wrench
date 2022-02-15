import React from 'react'
import { View, Dimensions } from 'react-native'
import { usePaginatedQuery, ProjectsDocument } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { InfiniteList, Title, Card } from 'ui'
import Skeleton from './SkeletonList'

export const { width } = Dimensions.get('window')

const GUTTER = 20
const BAR_SPACE = GUTTER / 2
const SNAP_INTERVAL = 180 + BAR_SPACE // Card size

const styles = {
  base: {
    height: 460,
  },
  header: {
    marginBottom: 40,
  },
  footer: {
    marginBottom: 40,
    marginTop: 50,
  },
}

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
        user={project.user}
        style={{
          marginRight: index === edges?.length - 1 ? GUTTER : BAR_SPACE,
        }}
      />
    )
  }

  const ListEmptyComponent = isFetching && <Skeleton />

  return (
    <View style={styles.base}>
      <Title medium style={styles.header}>
        {t('popular')}
      </Title>

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

      <Title medium style={styles.footer}>
        {t('recent')}
      </Title>
    </View>
  )
}

export default Popular
