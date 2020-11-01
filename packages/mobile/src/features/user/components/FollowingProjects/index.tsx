import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, UserFollowingProjectsDocument } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { InfiniteList } from 'ui'
import { Base, Title, Description, ProjectCard, GUTTER, BAR_SPACE, width } from './styles'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

function FollowingProjects({ user }) {
  const { t } = useTranslation('following-projects')
  const { navigate } = useNavigation()

  const {
    data: { edges },
    refetch,
    isFetching,
    isRefetching,
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

  return (
    <Base>
      <Title>{t('title')}</Title>
      <Description>{t('description', { name: user.firstName })}</Description>

      <InfiniteList
        data={edges}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        horizontal
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        loaderInset={270}
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
    </Base>
  )
}

export default FollowingProjects
