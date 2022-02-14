import React, { useCallback } from 'react'
import { Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useFollowProjectMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import Image from 'ui/Image'
import Touchable from 'ui/Touchable'
import Followers from 'ui/Followers'
import Text from 'ui/Text'
import Button from 'ui/Button'

const { width } = Dimensions.get('window')

export const height = width > 390 ? 220 : 190

const styles = {
  base: {
    position: 'relative',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  name: {
    marginTop: 10,
    marginBottom: 3,
    marginRight: 20,
  },
  content: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    bottom: 0,
    alignItems: 'flex-end',
    zIndex: 2,
  },
  button: {
    marginBottom: 5,
  },
  info: {
    justifyContent: 'flex-end',
    flex: 1,
  },
}

function ProjectCard({ onPress, onFollow, project, style }) {
  const { t } = useTranslation('project-card')
  const [followProject] = useFollowProjectMutation()

  const handleFollow = useCallback(() => {
    const totalCount = project.permissions.isFollower
      ? project.followers.totalCount - 1
      : project.followers.totalCount + 1

    const isFollower = !project.permissions.isFollower

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

    if (onFollow) {
      onFollow(project)
    }
  }, [project, onFollow])

  return (
    <Touchable
      style={[
        styles.base,
        {
          height,
        },
        style,
      ]}
      height={height}
    >
      <Touchable onPress={onPress}>
        {!project.cover.default && (
          <LinearGradient
            colors={['transparent', 'rgba(000, 000, 000, 0.7)']}
            locations={[0, 1]}
            style={styles.overlay}
          />
        )}
        <Image source={project.cover} height={height} />

        <View style={styles.content}>
          <View style={styles.info}>
            <Text numberOfLines={1} color="white" style={styles.name}>
              {project.title}
            </Text>
            <Followers followers={project.followers.totalCount} color="white" opacity={0.9} />
          </View>

          {!project.permissions.isOwner && (
            <Button small color="inverse" onPress={handleFollow} style={styles.button}>
              {project.permissions.isFollower ? t('unfollow') : t('follow')}
            </Button>
          )}
        </View>
      </Touchable>
    </Touchable>
  )
}

export default ProjectCard
