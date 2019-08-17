import React, { useCallback } from 'react'
import Touchable from 'ui/Touchable'
import Text from 'ui/Text'
import Followers from 'ui/Followers'
import Placeholder from 'ui/Placeholder'
// import { useNavigation, SCREENS } from 'navigation'
import { Picture, ProjectName, SIZE } from './styles'

function CardSmall({ image, title, onPress, followers, style = {} }) {
  return (
    <Touchable onPress={onPress} style={style}>
      {image ? (
        <Picture source={image} width={SIZE} height={SIZE} />
      ) : (
        <Placeholder style={{ width: SIZE, height: SIZE }} />
      )}
      <ProjectName fontSize={15} numberOfLines={1}>
        {title}
      </ProjectName>
      <Followers color="grey" followers={followers} />
    </Touchable>
  )
}

export default CardSmall
