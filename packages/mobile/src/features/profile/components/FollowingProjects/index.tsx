import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { InfiniteList } from 'ui'
import { getFollowingProjects } from 'graphql/queries/user/getFollowingProjects'
import { Base, Title, Description, ProjectCard, GUTTER, BAR_SPACE, width } from './styles'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

// TODO: Fetch more on end, fix scrollable
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

  return (
    <Base>
      <Title>{t('FollowingProjects:title')}</Title>
      <Description>{t('FollowingProjects:description', { name: user.firstName })}</Description>

      <InfiniteList
        data={projects}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        horizontal
        directionalLockEnabled
        paddingHorizontal={0}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        renderItem={({ item }) => (
          <ProjectCard
            project={item.node}
            onPress={() =>
              navigate(SCREENS.PROJECT, {
                slug: item.node.slug,
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
        }}
      />
    </Base>
  )
}

export default getFollowingProjects(FollowingProjects)
