import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, UserFollowingProjectsDocument } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { InfiniteList } from 'ui'
import { Base, Title, Description, ProjectCard, GUTTER, BAR_SPACE, width } from './styles'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

function FollowingProjects({ user }) {
  const { t } = useTranslation()
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
      <Title>{t('FollowingProjects:title')}</Title>
      <Description>{t('FollowingProjects:description', { name: user.firstName })}</Description>

      <InfiniteList
        data={edges}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={false}
        hasNextPage={hasNextPage}
        loaderPosition={-270}
        horizontal
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        loaderInset={-280}
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
