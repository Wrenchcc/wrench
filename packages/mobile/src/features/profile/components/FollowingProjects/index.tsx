import React from 'react'
import PropTypes from 'prop-types'
import { useNavigation, SCREENS } from 'navigation'
import withTranslation from 'i18n/withTranslation'
import { compose } from 'react-apollo'
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
  t,
}) {
  const { navigate } = useNavigation()

  return (
    <Base>
      <Title>{t('FollowingProjects:title')}</Title>
      <Description>{t('FollowingProjects:description', { name: user.firstName })}</Description>

      <InfiniteList
        keyExtractor={item => item.node.id}
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
            onPress={() => navigate(SCREENS.PROJECT, {
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

FollowingProjects.propTypes = {
  user: PropTypes.object,
  projects: PropTypes.array,
  isFetching: PropTypes.bool,
  refetch: PropTypes.bool,
  fetchMore: PropTypes.bool,
  isRefetching: PropTypes.bool,
  hasNextPage: PropTypes.bool,
}

export default compose(
  getFollowingProjects,
  withTranslation('FollowingProjects')
)(FollowingProjects)
