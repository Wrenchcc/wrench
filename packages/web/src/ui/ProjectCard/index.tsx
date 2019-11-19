// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import Text from '../Text'
import FollowSmall from 'components/FollowSmall'
import { Base, Picture, ProjectName, Inner, Content, Overlay, WIDTH, HEIGHT } from './styles'

function ProjectCard({ project, onFollow }) {
  return (
    <Base>
      <Link href="/project/[slug]" as={`/project/${project.slug}`}>
        <a>
          <Picture source={project.cover.uri} width={WIDTH} height={HEIGHT} />
          <Overlay />
        </a>
      </Link>

      <Inner>
        <Content>
          <Link href="/project/[slug]" as={`/project/${project.slug}`}>
            <a>
              <ProjectName medium color="white">
                {project.title}
              </ProjectName>
            </a>
          </Link>
          <Link href="/[username]" as={`/${project.user.username}`}>
            <a>
              <Text fontSize={15} color="white">
                {project.user.fullName}
              </Text>
            </a>
          </Link>
        </Content>

        <FollowSmall onPress={() => onFollow(project)} following={project.permissions.isFollower} />
      </Inner>
    </Base>
  )
}

export default ProjectCard
