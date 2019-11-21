// @ts-nocheck
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { FOLLOW_PROJECT_MUTATION } from 'graphql/mutations/project/follow'
import { useModal, Modal } from 'ui/Modal'
import Login from 'components/Login'
import { USER_FOLOWING_PROJECTS } from 'graphql/queries/user/followingProjects'
import { ProjectCard, Text } from 'ui'
import { Base, Title, List } from './styles'

function UserFollowingProjects({ username, isAuthenticated }) {
  const { t } = useTranslation()
  const router = useRouter()

  const [followProject] = useMutation(FOLLOW_PROJECT_MUTATION)

  const { data, loading } = useQuery(USER_FOLOWING_PROJECTS, {
    variables: {
      username,
    },
  })

  const [showModal, closeModal] = useModal(() => (
    <Modal close={closeModal}>
      <Login closeModal={closeModal} referral={router.asPath} />
    </Modal>
  ))

  const toggleFollow = project => {
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
      <Text>
        {t('UserFollowingProjects:description', {
          name: data.user.firstName,
        })}
      </Text>

      <List>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 50 }}>
          {data.user.following.edges.map(({ node }) => (
            <div
              key={node.id}
              style={{
                width: '33.33%',
                paddingBottom: 20,
                boxSizing: 'border-box',
              }}
            >
              <ProjectCard key={node.id} project={node} onFollow={() => toggleFollow(node)} />
            </div>
          ))}
        </div>
      </List>
    </Base>
  )
}

export default UserFollowingProjects
