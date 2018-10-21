import React from 'react'
import { Image } from 'react-native'
import { compose } from 'react-apollo'
import { empty } from 'ramda'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { navigateToAddMedia, navigateToAddProject } from 'navigation'
import { add } from 'images'
import hitSlop from 'utils/hitSlop'
import { Button } from './styles'

function Add(props) {
  let onPress
  if (empty(props.projects)) {
    onPress = () => navigateToAddProject()
  }

  onPress = () => navigateToAddMedia()

  return (
    <Button hitSlop={hitSlop(20)} onPress={onPress} {...props}>
      <Image source={add} />
    </Button>
  )
}

export default compose(getCurrentUserProjects)(Add)
