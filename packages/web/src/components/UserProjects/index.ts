import React from 'react'
import Link from 'next/link'
import { pathOr } from 'ramda'
import { Base, Row, Content, Text, List, Image } from './styles'

function UserProjects({ projects, fullName }) {
  return (
    <Base>
      <Text medium fontSize={24}>
        {fullName} projects
      </Text>

      <List>
        {projects.edges.map(({ node }) => (
          <Link
            href={{
              pathname: '/project',
              query: { slug: node.slug },
            }}
            as={{
              pathname: `/project/${node.slug}`,
            }}
          >
            <a>
              <Row key={node.id}>
                <Image source={pathOr(null, ['files', 'edges', [0], 'node', 'uri'], node)} />
                <Content>
                  <Text>{node.title}</Text>
                  <Text color="light_grey" fontSize={15} lineHeight={18}>
                    {node.followers.totalCount} Followers
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
