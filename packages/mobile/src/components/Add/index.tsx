import React, { useCallback } from 'react'
import { useNavigation, SCREENS } from 'navigation'
import { useCurrentUserProjectsQuery } from '@wrench/common'
import { COLORS } from 'ui/constants'
import Icon from 'ui/Icon'
import { isIphone } from 'utils/platform'
import { add } from 'images'

function Add() {
  const { showModal } = useNavigation()
  const { data } = useCurrentUserProjectsQuery({
    fetchPolicy: 'cache-only',
  })

  const handleNavigation = useCallback(
    () =>
      showModal(data.user.projects.edges.length > 0 ? SCREENS.ADD_MEDIA : SCREENS.ADD_PROJECT, {
        options: {
          layout: {
            backgroundColor: data.user.projects.edges.length > 0 ? COLORS.DARK : COLORS.WHITE,
          },
          statusBar: {
            backgroundColor: data.user.projects.edges.length > 0 ? 'black' : 'white',
            style: data.user.projects.edges.length > 0 ? 'light' : 'dark',
            visible: isIphone ? false : true,
          },
        },
      }),
    [data.user]
  )

  return <Icon hitSlop={20} onPress={handleNavigation} source={add} style={{ paddingLeft: 20 }} />
}

export default Add
