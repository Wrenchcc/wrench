import React, { useCallback } from 'react'
import { useNavigation, SCREENS } from 'navigation'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import Icon from 'ui/Icon'
import { add } from 'images'

function Add({ projects }) {
  const { showModal } = useNavigation()
  const handleNavigation = useCallback(
    () => showModal(projects.length > 0 ? SCREENS.ADD_MEDIA : SCREENS.ADD_PROJECT),
    [projects.length]
  )

  return (
    <Icon
      hitSlop={20}
      onPress={handleNavigation}
      source={add}
      hapticFeedback="impactLight"
      style={{ paddingLeft: 20 }}
    />
  )
}

export default getCurrentUserProjects(Add)
