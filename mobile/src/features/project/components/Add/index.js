import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { navigateToAddMedia, navigateToAddProject } from 'navigation'
import { Icon } from 'ui'
import { add } from 'images'

function Add(props) {
  let onPress
  if (props.projects.length > 0) {
    onPress = () => navigateToAddMedia()
  } else {
    onPress = () => navigateToAddProject()
  }

  return (
    <Icon hitSlop={20} onPress={onPress} source={add} hapticFeedback="impactLight" {...props} />
  )
}

Add.propTypes = {
  projects: PropTypes.array,
}

export default compose(getCurrentUserProjects)(Add)
