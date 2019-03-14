import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { pathOr } from 'ramda'
import { Base, Row, Content, Text, List, Image } from './styles'

function UserProjects({ projects, fullName }) {
  const { t } = useTranslation()

  return (
    projects.edges.length > 0 && (
      <Base>
        <Text medium fontSize={24}>
          {t('UserProjects:title', { fullName })}
        </Text>

        <List>
          {projects.edges.map(({ node }) => (
            <Link
              key={node.id}
              href={{
                pathname: '/project',
                query: { slug: node.slug },
              }}
              as={{
                pathname: `/project/${node.slug}`,
              }}
            >
              <a>
                <Row>
                  <Image
                    source={pathOr(null, ['files', 'edges', [0], 'node', 'uri'], node)}
                    width={90}
                    height={90}
                  />
                  <Content>
                    <Text>{node.title}</Text>
                    <Text color="light_grey" fontSize={15} lineHeight={18}>
                      {t('UserProjects:followers', { count: node.followers.totalCount })}
                    </Text>
                  </Content>
                </Row>
              </a>
            </Link>
          ))}
        </List>
      </Base>
    )
  )
}

export default UserProjects
