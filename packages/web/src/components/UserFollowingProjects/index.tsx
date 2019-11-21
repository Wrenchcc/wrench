// @ts-nocheck
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'
import { USER_FOLOWING_PROJECTS } from 'graphql/queries/user/followingProjects'
import { ProjectCard, Text } from 'ui'
import { Base, Title, List } from './styles'

function UserFollowingProjects({ username }) {
  const { t } = useTranslation()
  const { data, loading } = useQuery(USER_FOLOWING_PROJECTS, {
    variables: {
      username,
    },
  })

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
              <ProjectCard key={node.id} project={node} onFollow={() => {}} />
            </div>
          ))}
        </div>
      </List>
    </Base>
  )
}

export default UserFollowingProjects
