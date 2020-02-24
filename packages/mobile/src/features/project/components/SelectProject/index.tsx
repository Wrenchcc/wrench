import React, { useState, useCallback } from 'react'
import { pathOr } from 'rambda'
import { useCurrentUserProjectsQuery } from '@wrench/common'
import { usePostStore, POST } from 'store'
import { Text, Icon, Touchable } from 'ui'
import { arrowDown, arrowUp } from 'images'
import List from './List'
import { Base } from './styles'

function getProjectById(id, projects) {
  const project = projects && projects.find(({ node }) => node.id === id)
  return pathOr(projects[0]?.node, ['node'], project)
}

function SelectProject({ black = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useCurrentUserProjectsQuery({
    fetchPolicy: 'cache-only',
  })

  const projects = data?.user.projects.edges

  const { projectId, title, update } = usePostStore(store => {
    const project = getProjectById(store.projectId, projects)
    return {
      projectId: project?.id,
      title: project?.title,
      update: store.actions.update,
    }
  })

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
            color={(black && 'default') || isOpen ? 'inverse' : 'white'}
            medium
            style={{ zIndex: 100, maxWidth: '92%' }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Icon
            style={{ marginLeft: 10 }}
            source={isOpen ? arrowUp : arrowDown}
            color={(black && 'default') || isOpen ? 'inverse' : 'white'}
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
