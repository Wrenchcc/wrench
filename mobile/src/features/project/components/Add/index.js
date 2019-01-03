import React from 'react'
import { Image } from 'react-native'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { navigateToAddMedia, navigateToAddProject } from 'navigation'
import { add } from 'images'
import { Button } from './styles'

function Add(props) {
  let onPress
  if (props.projects.length > 0) {
    onPress = () => navigateToAddMedia()
  } else {
    onPress = () => navigateToAddProject()
  }

  return (
    <Button hitSlop={20} onPress={onPress} {...props}>
      <Image source={add} />
    </Button>
  )
}

Add.propTypes = {
  projects: PropTypes.array,
}

export default compose(getCurrentUserProjects)(Add)
