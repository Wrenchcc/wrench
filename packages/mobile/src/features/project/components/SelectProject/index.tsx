import React, { useState, useCallback } from 'react'
import { pathOr } from 'ramda'
import { useQuery, CURRENT_USER_PROJECTS_QUERY } from 'gql'
import { usePostStore, POST } from 'store'
import { Text, Icon, Touchable } from 'ui'
import { arrowDown, arrowUp } from 'images'
import List from './List'
import { Base } from './styles'

function getProjectById(id, projects) {
  const project = projects && projects.find(({ node }) => node.id === id)
  return pathOr(projects && projects[0].node, ['node'], project)
}

function SelectProject({ dark = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useQuery(CURRENT_USER_PROJECTS_QUERY, {
    fetchPolicy: 'cache-only',
  })

  const projects = data.user.projects.edges

  const { projectId, title, update } = usePostStore(store => ({
    projectId: getProjectById(store.projectId, projects).id,
    title: getProjectById(store.projectId, projects).title,
    update: store.actions.update,
  }))

  const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen])
  const handleClose = useCallback(() => setIsOpen(false), [])

  const handleOnPress = useCallback(
    selectedId => {
      handleClose(false)
      update(POST.PROJECT_ID, selectedId)
    },
    [handleClose, update]
  )

  return (
    <>
      <Base>
        <Touchable
          onPress={toggleOpen}
          activeOpacity={0.8}
          nativeHandler
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            color={(dark && 'dark') || isOpen ? 'dark' : 'white'}
            medium
            style={{ zIndex: 100, maxWidth: '95%' }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Icon
            style={{ marginLeft: 10 }}
            source={isOpen ? arrowUp : arrowDown}
            color={(dark && 'dark') || isOpen ? 'light_grey' : 'white'}
          />
        </Touchable>
      </Base>

      <List
        projects={projects}
        selectedId={projectId}
        open={isOpen}
        onPress={handleOnPress}
        onClose={handleClose}
      />
    </>
  )
}

export default SelectProject
