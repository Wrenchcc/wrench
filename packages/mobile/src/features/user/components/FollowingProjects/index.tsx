import React from 'react'
import { Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, UserFollowingProjectsDocument } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { InfiniteList, ProjectCard, Title, Text } from 'ui'
import Skeleton from './Skeleton'

const { width } = Dimensions.get('window')

const GUTTER = 20
const BAR_SPACE = GUTTER / 2
const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

const styles = {
  headline: {
    marginBottom: 12,
  },
  description: {
    marginBottom: 40,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    marginLeft: -GUTTER,
    marginRight: -GUTTER,
  },
}

function FollowingProjects({ user }) {
  const { t } = useTranslation('following-projects')
  const { navigate } = useNavigation()

  const {
    data: { edges },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['user', 'projects'])(UserFollowingProjectsDocument, {
    variables: {
      username: user.username,
    },
  })

  const renderItem = ({ item }) => {
    const onPress = () =>
      navigate(SCREENS.PROJECT, {
        id: item.node.id,
        project: item.node,
      })

    return (
      <ProjectCard
        project={item.node}
        onPress={onPress}
        style={{
          width: width - GUTTER * 2,
          marginBottom: 50,
          marginRight: BAR_SPACE,
        }}
      />
    )
  }

  const ListEmptyComponent = isFetching && <Skeleton />

  return (
    <>
      <Title style={styles.headline}>{t('title')}</Title>
      <Text style={styles.description}>{t('description', { name: user.firstName })}</Text>

      <InfiniteList
        paddingVertical={0}
        data={edges}
        fetchMore={fetchMore}
        isFetching={edges && isFetching}
        hasNextPage={hasNextPage}
        ListEmptyComponent={ListEmptyComponent}
        horizontal
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </>
  )
}

export default FollowingProjects
