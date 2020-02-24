import React, { useCallback } from 'react'
import { pathOr } from 'rambda'
import { Text, Followers } from 'ui'
import { check } from 'images'
import { Base, Cover, Middle, Content, Icon } from './styles'

function Project({ id, files, title, followers, onPress, selected }) {
  const image = pathOr(null, ['edges', 0, 'node'], files)
  const handleOnPress = useCallback(() => onPress(id), [id, onPress])

  return (
    <Base key={id} onPress={handleOnPress} nativeHandler>
      {image && <Cover source={image} width={40} height={40} />}

      <Middle>
        <Content>
          <Text numberOfLines={1}>{title}</Text>
          <Followers color="neutral" followers={followers.totalCount} />
        </Content>
        {selected && <Icon source={check} />}
      </Middle>
    </Base>
  )
}

export default Project
