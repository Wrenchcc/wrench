import React, { useState, useCallback, useEffect } from 'react'
import { View } from 'react-native'
import { useCurrentUserProjectsQuery } from '@wrench/common'
import { useReactiveVar, store } from 'gql'
import { Text, Icon, Touchable } from 'ui'
import { NAVIGATION } from 'navigation/constants'
import { arrowDown, arrowUp } from 'images'
import List from './List'

const styles = {
  base: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: NAVIGATION.STATUS_BAR_HEIGHT + 10,
    zIndex: 100,
    width: '45%',
    position: 'absolute',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}

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

  useEffect(() => {
    const savedId = store.project.getProjectId()
    const id = idFromNavigation || savedId || projects[0].node.id
    store.project.setProjectId(id)
  }, [])

  return (
    <>
      <View style={styles.base}>
        <Touchable onPress={toggleOpen} activeOpacity={0.8} style={styles.button}>
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
      </View>

      {isOpen && <List projects={projects} onPress={handleOnPress} onClose={handleClose} />}
    </>
  )
}

export default SelectProject
