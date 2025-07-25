// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'i18n'
import { Base, Row, Box, Content, Text, List, Image } from './styles'

function UserProjects({ projects }) {
  const { t } = useTranslation('user-projects')

  return (
    <Base>
      <Text medium fontSize={24}>
        {t('title')}
      </Text>

      <List>
        {projects.edges.map(({ node }) => (
          <Link key={node.id} href={`/project/${node.slug}`}>
            <a>
              <Row>
                <Box>
                  <Image source={node.cover.uri} width={90} height={90} />
                </Box>
                <Content>
                  <Text>{node.title}</Text>
                  <Text color="neutral" fontSize={15} lineHeight={18}>
                    {t('followers', { count: node.followers.totalCount })}
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

export default UserProjects
