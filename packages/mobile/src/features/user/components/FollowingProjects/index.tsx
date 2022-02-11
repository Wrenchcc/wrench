import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, UserFollowingProjectsDocument } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { InfiniteList } from 'ui'
import { Title, Description, ProjectCard, GUTTER, BAR_SPACE, width } from './styles'
import Skeleton from './Skeleton'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

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

    return <ProjectCard project={item.node} onPress={onPress} />
  }

  const ListEmptyComponent = isFetching && <Skeleton />

  return (
    <>
      <Title>{t('title')}</Title>
      <Description>{t('description', { name: user.firstName })}</Description>

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
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
        }}
      />
    </>
  )
}

export default FollowingProjects
