import React from 'react'
import { navigateToProject } from 'navigation'
import { FlatList, ProjectCard } from 'ui'
import data from 'fixtures/search'

const Projects = () => (
  <FlatList
    data={data.projects}
    keyExtractor={item => item.id}
    paddingBottom={20}
    renderItem={({ item }) => (
      <ProjectCard
        {...item}
        onPress={() => navigateToProject({ id: item.id, user: item.user, project: item })}
      />
    )}
  />
)

export default Projects
