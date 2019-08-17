import React from 'react'
import Touchable from 'ui/Touchable'
import Followers from 'ui/Followers'
import { Picture, ProjectName, SIZE } from './styles'

function CardSmall({ onPress, image, title, followers, style = {} }) {
  return (
    <Touchable onPress={onPress} style={style}>
      <Picture source={image} width={SIZE} height={SIZE} />
      <ProjectName fontSize={15} numberOfLines={1}>
        {title}
      </ProjectName>
      <Followers color="grey" followers={followers} />
    </Touchable>
  )
}

export default CardSmall
