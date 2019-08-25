import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { Title, InfiniteList, CardSmall } from 'ui'
import { Base, Follow, SNAP_INTERVAL } from './styles'

function SimilarProjects({ projects, fetchMore, isFetching, hasNextPage }) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const renderItem = ({ item }) => {
    const handleNavigation = () => {
      navigate(SCREENS.PROJECT, {
        id: item.node.id,
        project: item.node,
      })
    }

    return (
      <CardSmall
        key={item.node.id}
        onPress={handleNavigation}
        title={item.node.title}
        followers={item.node.followers.totalCount}
        image={item.node.cover}
        style={{
          marginLeft: 5,
          marginRight: 5,
        }}
      >
        {item.node.permissions && !item.node.permissions.isOwner && (
          <Follow
            small
            following={item.node.permissions.isFollower}
            onPress={() => alert('follow')}
          />
        )}
      </CardSmall>
    )
  }

  return (
    <Base>
      <Title style={{ marginBottom: 20 }}>{t('SimilarProjects:title')}</Title>

      <InfiniteList
        initialNumToRender={3}
        data={projects.edges}
        horizontal
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        fetchMore={fetchMore}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{
          marginLeft: -25,
          marginRight: -25,
        }}
      />
    </Base>
  )
}

export default SimilarProjects
