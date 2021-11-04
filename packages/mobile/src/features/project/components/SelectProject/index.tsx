import React, { useState, useCallback, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useCurrentUserProjectsQuery } from '@wrench/common'
import { store } from 'gql'
import { Text, Icon, Touchable } from 'ui'
import { arrowDown, arrowUp } from 'images'
import List from './List'
import { Base } from './styles'

function SelectProject({ black = false, selectedId: idFromNavigation }) {
  const [isOpen, setIsOpen] = useState(false)

  const { data } = useCurrentUserProjectsQuery({ fetchPolicy: 'cache-only' })
  const projects = data?.user.projects.edges

  const selectedId = useReactiveVar(store.project.selectedIdVar)
  const title = projects?.find((a) => a.node.id === selectedId)?.node.title

  const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen])
  const handleClose = useCallback(() => setIsOpen(false), [])

  const handleOnPress = useCallback((id) => {
    handleClose()
    store.project.setProjectId(id)
  }, [])

  function setInitialProject() {
    const savedId = store.project.getProjectId()

    // if saved project is deleted
    if (projects.some(({ node }) => savedId !== node.id)) {
      store.project.setProjectId(projects[0].node.id)
    }

    const id = idFromNavigation || savedId || projects[0].node.id

    store.project.setProjectId(id)
  }

  useEffect(() => {
    setInitialProject()
  }, [])

  return (
    <>
      <Base>
        <Touchable
          onPress={toggleOpen}
          activeOpacity={0.8}
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
            onPress={toggleOpen}
            style={{ marginLeft: 10 }}
            source={isOpen ? arrowUp : arrowDown}
            color={(black && 'default') || isOpen ? 'inverse' : 'white'}
          />
        </Touchable>
      </Base>

      <List
        projects={projects}
        selectedId={selectedId}
        open={isOpen}
        onPress={handleOnPress}
        onClose={handleClose}
      />
    </>
  )
}

export default SelectProject
