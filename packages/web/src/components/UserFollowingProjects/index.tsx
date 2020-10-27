// @ts-nocheck
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useUserFollowingProjectsQuery, useFollowProjectMutation } from '@wrench/common'
import { useRouter } from 'next/router'
import { useModal, Modal } from 'ui/Modal'
import Login from 'components/Login'
import { ProjectCard, Text } from 'ui'
import { Base, Title, List, Inner } from './styles'

function UserFollowingProjects({ username, isAuthenticated }) {
  const { t } = useTranslation()
  const router = useRouter()

  const [followProject] = useFollowProjectMutation()

  const { data, loading } = useUserFollowingProjectsQuery({
    variables: {
      username,
      first: 6,
    },
  })

  const [showModal, closeModal] = useModal(() => (
    <Modal close={closeModal}>
      <Login closeModal={closeModal} referral={router.asPath} />
    </Modal>
  ))

  const toggleFollow = (project) => {
    if (!isAuthenticated) {
      showModal()
      return
    }

    const isFollower = !project.permissions.isFollower

    followProject({
      variables: {
        id: project.id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        followProject: {
          id: project.id,
          ...project,
          followers: {
            ...project.followers,
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

  if (loading) {
    return null
  }

  return (
    <Base>
      <Title>{t('UserFollowingProjects:title')}</Title>
      <Text color="neutral">
        {t('UserFollowingProjects:description', {
          name: data.user.firstName,
        })}
      </Text>

      <List>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 50 }}>
          {data.user.projects.edges.map(({ node }) => (
            <Inner key={node.id}>
              <ProjectCard key={node.id} project={node} onFollow={() => toggleFollow(node)} />
            </Inner>
          ))}
        </div>
      </List>
    </Base>
  )
}

export default UserFollowingProjects
