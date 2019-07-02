import React, { useState, useCallback } from 'react'
import { pathOr } from 'ramda'
import { useQuery, CURRENT_USER_PROJECTS_QUERY } from 'gql'
import { usePostStore, POST } from 'store'
import Text from 'ui/Text'
import { arrowDown, arrowUpGrey, arrowDownGrey } from 'images'
import List from './List'
import { Base, Icon } from './styles'

function getProjectById(id, projects) {
  const project = projects.find(({ node }) => node.id === id)
  return pathOr(projects[0].node, ['node'], project)
}

function SelectProject({ dark = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useQuery(CURRENT_USER_PROJECTS_QUERY, {
    fetchPolicy: 'cache-only',
  })

  const projects = data.user.projects.edges

  // TODO: Rerender only when projects change
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

  let icon

  if (isOpen) {
    icon = arrowUpGrey
  } else if (dark) {
    icon = arrowDownGrey
  } else {
    icon = arrowDown
  }

  return (
    <>
      <Base onPress={toggleOpen} activeOpacity={0.8}>
        <Text
          color={(dark && 'dark') || isOpen ? 'dark' : 'white'}
          medium
          style={{ zIndex: 100 }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Icon source={icon} />
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
