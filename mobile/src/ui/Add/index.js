import React from 'react'
import { Image } from 'react-native'
import { navigateToAddMedia, navigateToAddProject } from 'navigation'
import { add } from 'images'
import hitSlop from 'utils/hitSlop'
import { Button } from './styles'

// TODO: If user have project -> Add Post != Create project
const onPress = () => {
  // if (false) {
  return navigateToAddProject()
  // }

  return navigateToAddMedia()
}

export default function Add(props) {
  return (
    <Button hitSlop={hitSlop(20)} onPress={onPress} {...props}>
      <Image source={add} />
    </Button>
  )
}
