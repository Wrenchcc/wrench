// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import Text from '../Text'
import {
  Base,
  Picture,
  ProjectName,
  Username,
  Inner,
  Content,
  Follow,
  Left,
  Right,
  WIDTH,
  HEIGHT,
} from './styles'

function ProjectCard({ project, onFollow }) {
  return (
    <Base>
      <Inner>
        <Left>
          <Link href={`/project/${project.slug}`}>
            <a>
              <Picture source={project.cover.uri} width={WIDTH} height={HEIGHT} />
            </a>
          </Link>
          <Content>
            <Link href={`/project/${project.slug}`}>
              <a>
                <ProjectName medium color="white">
                  {project.title}
                </ProjectName>
              </a>
            </Link>
            <Link href={`/${project.user.username}`}>
              <a>
                <Username fontSize={15} color="accent">
                  {project.user.fullName}
                </Username>
              </a>
            </Link>
          </Content>
        </Left>
        <Right>
          <Follow onPress={() => onFollow(project)}>
            {project.permissions.isFollower ? 'Following' : 'Follow'}
          </Follow>
        </Right>
      </Inner>
    </Base>
  )
}

export default ProjectCard
