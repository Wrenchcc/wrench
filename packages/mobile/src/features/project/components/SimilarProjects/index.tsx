import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { View as MotiView } from 'moti'
import { useFollowProjectMutation } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { Title, InfiniteList, CardSmall, Follow } from 'ui'
import PlatformColor from 'ui/PlatformColor'

const GUTTER = 10
const SIZE = 120
const SNAP_INTERVAL = SIZE + GUTTER // Card size

const styles = {
  base: {
    backgroundColor: PlatformColor.placeholder,
    marginLeft: -20,
    marginRight: -20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  card: {
    marginLeft: 5,
    marginRight: 5,
  },
  follow: {
    position: 'absolute',
    top: 80,
    left: 10,
    right: 10,
    width: 100,
    height: 30,
    paddingLeft: 5,
    paddingRight: 5,
  },
  title: {
    marginBottom: 20,
  },
  list: {
    marginLeft: -25,
    marginRight: -25,
  },
}

function SimilarProjects({ projects, marginTop, disableAnimation }) {
  const { t } = useTranslation('similar-projects')
  const { navigate } = useNavigation()
  const [toggleFollow] = useFollowProjectMutation()

  const renderItem = ({ item }) => {
    const project = item.node
    const id = item.node.id

    const handleNavigation = () => {
      navigate(SCREENS.PROJECT, {
        id,
        project,
      })
    }

    const handletoggleFollow = () => {
      const isFollower = !project.permissions.isFollower
      const totalCount = project.permissions.isFollower
        ? project.followers.totalCount - 1
        : project.followers.totalCount + 1

      toggleFollow({
        variables: {
          id,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          followProject: {
            id,
            ...project,
            followers: {
              ...project.followers,
              totalCount,
            },
            permissions: {
              ...project.permissions,
              isFollower,
            },
            __typename: 'Project',
          },
        },
      })
    }

    return (
      <CardSmall
        key={id}
        onPress={handleNavigation}
        title={project.title}
        followers={project.followers.totalCount}
        image={project.cover}
        style={styles.card}
      >
        {project.permissions && !project.permissions.isOwner && (
          <Follow
            small
            following={project.permissions.isFollower}
            onPress={handletoggleFollow}
            style={styles.follow}
          />
        )}
      </CardSmall>
    )
  }

  if (disableAnimation) {
    return (
      <View
        style={[
          styles.base,
          {
            marginTop: marginTop || 40,
          },
        ]}
      >
        <Title style={styles.title}>{t('title')}</Title>

        <InfiniteList
          paddingVertical={0}
          initialNumToRender={3}
          data={projects.edges}
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
      </View>
    )
  }

  return (
    <MotiView
      from={{ height: 0, opacity: 0 }}
      animate={{ height: 290, opacity: 1 }}
      transition={{
        type: 'timing',
        duration: 250,
      }}
      exit={{
        height: 0,
        opacity: 0,
      }}
    >
      <View
        style={[
          styles.base,
          {
            marginTop: marginTop || 40,
          },
        ]}
      >
        <Title style={styles.title}>{t('title')}</Title>

        <InfiniteList
          paddingVertical={0}
          initialNumToRender={3}
          data={projects.edges}
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
      </View>
    </MotiView>
  )
}

export default SimilarProjects
