import React from 'react'
import { navigateToProject } from 'navigation'
import { InfiniteList, ProjectCard } from 'ui'
import data from 'fixtures/search'

const ITEM_HEIGHT = 220

const Projects = () => (
  <InfiniteList
    data={data.projects}
    keyExtractor={item => item.id}
    paddingBottom={20}
    renderItem={({ item }) => (
      <ProjectCard
        {...item}
        onPress={() => navigateToProject({ id: item.id, user: item.user, project: item })}
      />
    )}
    getItemLayout={(data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    })}
  />
)

export default Projects
