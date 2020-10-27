// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import { useCurrentUserFollowingProjectsQuery } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { Base, Row, Box, Content, Text, List, Image } from './styles'

function FollowingProjects() {
  const { t } = useTranslation()
  const { data, loading } = useCurrentUserFollowingProjectsQuery()

  if (loading || !data.currentUser) {
    return null
  }

  const projects = data.currentUser.following

  return (
    <Base>
      <Text medium fontSize={24}>
        {t('FollowingProjects:title')}
      </Text>

      <List>
        {projects.edges.map(({ node }) => (
          <Link key={node.id} href="/project/[slug]" as={`/project/${node.slug}`}>
            <a>
              <Row>
                <Box>
                  <Image source={node.cover.uri} width={90} height={90} />
                </Box>
                <Content>
                  <Text>{node.title}</Text>
                  <Text color="neutral" fontSize={15} lineHeight={18}>
                    {node.user.fullName}
                  </Text>
                </Content>
              </Row>
            </a>
          </Link>
        ))}
      </List>
    </Base>
  )
}

export default FollowingProjects
