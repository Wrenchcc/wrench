import React from 'react'
import { Image } from 'react-native'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { navigateToAddMedia, navigateToAddProject } from 'navigation'
import { add } from 'images'
import hitSlop from 'utils/hitSlop'
import { Button } from './styles'

function Add(props) {
  let onPress
  if (props.projects.length > 0) {
    onPress = () => navigateToAddMedia()
  } else {
    onPress = () => navigateToAddProject()
  }

  return (
    <Button hitSlop={hitSlop(20)} onPress={onPress} {...props}>
      <Image source={add} />
    </Button>
  )
}

export default compose(getCurrentUserProjects)(Add)
