import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { InfiniteList } from 'ui'
import { getFollowingProjects } from 'graphql/queries/user/getFollowingProjects'
import { Base, Title, Description, ProjectCard, GUTTER, BAR_SPACE, width } from './styles'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

function FollowingProjects({
  projects,
  isFetching,
  user,
  refetch,
  fetchMore,
  isRefetching,
  hasNextPage,
}) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

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
      <Description>{t('FollowingProjects:description', { name: user.fullName })}</Description>

      <InfiniteList
        data={projects}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        loaderPosition={-270}
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
    </Base>
  )
}

export default getFollowingProjects(FollowingProjects)
