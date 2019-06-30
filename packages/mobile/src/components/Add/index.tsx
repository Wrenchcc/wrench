import React, { useCallback } from 'react'
import { useNavigation, SCREENS } from 'navigation'
import { useQuery, CURRENT_USER_PROJECTS_QUERY } from 'gql'
import Icon from 'ui/Icon'
import { add } from 'images'

function Add() {
  const { data } = useQuery(CURRENT_USER_PROJECTS_QUERY, { fetchPolicy: 'cache-only' })
  const { showModal } = useNavigation()

  const handleNavigation = useCallback(
    () =>
      showModal(data.user.projects.edges.length > 0 ? SCREENS.ADD_MEDIA : SCREENS.ADD_PROJECT, {
        options: {
          layout: {
            backgroundColor: 'black',
          },
          statusBar: {
            visible: false,
          },
        },
      }),
    [data.user]
  )

  return <Icon hitSlop={20} onPress={handleNavigation} source={add} style={{ paddingLeft: 20 }} />
}

export default Add
