import React, { useState, useCallback } from 'react'
import { pathOr } from 'ramda'
import { usePostStore, POST } from 'store'
import Text from 'ui/Text'
import { arrowDown, arrowUpGrey, arrowDownGrey } from 'images'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import List from './List'
import { Base, Icon } from './styles'

function getProjectById(id, projects) {
  const project = projects.find(({ node }) => node.id === id)
  return pathOr(projects[0].node, ['node'], project)
}

function SelectProject({ dark = false, projects }) {
  const [isOpen, setIsOpen] = useState(false)

  const { projectId, title, update } = usePostStore(
    store => ({
      projectId: getProjectById(store.projectId, projects).projectId,
      title: getProjectById(store.projectId, projects).title,
      update: store.actions.update,
    }),
    [projects]
  )

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
      <Base onPress={toggleOpen} hapticFeedback="impactLight" activeOpacity={0.8}>
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

export default getCurrentUserProjects(SelectProject)
