import React, { useState, useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useReactiveVar } from '@apollo/client'
import { useCurrentUserProjectsQuery } from '@wrench/common'
import { store } from 'gql'
import { SELECTED_PROJECT_ID_KEY } from 'utils/storage/constants'
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
    store.project.selectedIdVar(id)
    AsyncStorage.setItem(SELECTED_PROJECT_ID_KEY, id)
  }, [])

  async function setInitialProject() {
    const savedId = await AsyncStorage.getItem(SELECTED_PROJECT_ID_KEY)

    if (idFromNavigation) {
      store.project.selectedIdVar(idFromNavigation)
      AsyncStorage.setItem(SELECTED_PROJECT_ID_KEY, idFromNavigation)
      return
    }

    if (savedId) {
      store.project.selectedIdVar(savedId)
      return
    }

    store.project.selectedIdVar(projects[0].node.id)
    return
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
