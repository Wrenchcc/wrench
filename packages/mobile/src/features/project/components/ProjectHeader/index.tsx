import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { AnimatePresence } from 'moti'
import { useSimilarProjectsLazyQuery, useFollowProjectMutation } from '@wrench/common'
import * as Spacing from 'ui/Spacing'
import { ActivityIndicator, Title, Follow, Icon, UserStack, Followers } from 'ui'
import { arrowDown, arrowUp } from 'images'
import { useNavigation, SCREENS } from 'navigation'
import SimilarProjects from '../SimilarProjects'
import Collections from '../Collections'
import PlatformColor from 'ui/PlatformColor'

const styles = {
  base: {
    marginBottom: 50,
  },
  folowers: {
    marginTop: 7,
    alignSelf: 'flex-start',
  },
  actions: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  meta: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 35,
  },
  open: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: PlatformColor.divider,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: 'flex-start',
  },
}

function ProjectHeader({ project }) {
  const { navigate } = useNavigation()
  const [isShowingSimilarProjects, setIsShowingSimilarProjects] = useState(false)

  const [getSimilarProjects, { loading, data }] = useSimilarProjectsLazyQuery({
    variables: {
      id: project.id,
    },
  })

  const isFollower = !project.permissions.isFollower
  const isOwner = project?.permissions.isOwner

  const handleSimilarProjects = useCallback(() => {
    if (!isShowingSimilarProjects && !data?.similarProjects) {
      getSimilarProjects()
      setIsShowingSimilarProjects(true)
    }

    if (!isShowingSimilarProjects && data?.similarProjects) {
      setIsShowingSimilarProjects(true)
    }

    if (isShowingSimilarProjects) {
      setIsShowingSimilarProjects(false)
    }
  }, [isShowingSimilarProjects, getSimilarProjects])

  const [followProject] = useFollowProjectMutation()

  const handleFollow = useCallback(() => {
    const totalCount = project.permissions.isFollower
      ? project.followers.totalCount - 1
      : project.followers.totalCount + 1

    followProject({
      variables: {
        id: project.id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        followProject: {
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

    if (!project.permissions.isFollower) {
      getSimilarProjects()
      setIsShowingSimilarProjects(true)
    }
  }, [project])

  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.FOLLOWERS, {
        id: project.id,
      }),
    [project]
  )

  return (
    <View style={styles.base}>
      <Title large numberOfLines={0}>
        {project?.title}
      </Title>

      <View style={styles.meta}>
        {project.followers.edges.length > 2 && (
          <UserStack users={project.followers.edges} onPress={handleNavigation} size={30} />
        )}

        <Followers
          style={styles.folowers}
          followers={project.followers.totalCount}
          onPress={handleNavigation}
        />
      </View>

      <View style={styles.actions}>
        {!isOwner && <Follow following={project.permissions.isFollower} onPress={handleFollow} />}

        {!isOwner && (
          <View style={styles.open}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Icon
                source={isShowingSimilarProjects ? arrowUp : arrowDown}
                onPress={handleSimilarProjects}
              />
            )}
          </View>
        )}
      </View>

      <AnimatePresence>
        {data?.similarProjects && isShowingSimilarProjects && (
          <SimilarProjects projects={data.similarProjects} />
        )}
      </AnimatePresence>

      {!isOwner && <Spacing.Horizontally px={30} />}

      <Collections isOwner={isOwner} projectId={project.id} />
    </View>
  )
}

export default React.memo(ProjectHeader)
