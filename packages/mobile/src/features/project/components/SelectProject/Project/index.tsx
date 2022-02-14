import React, { useCallback } from 'react'
import { pathOr } from 'rambda'
import { Text, Followers } from 'ui'
import { Base, Cover, Middle, Content } from './styles'

function Project({ id, files, title, followers, onPress }) {
  const image = pathOr(null, ['edges', 0, 'node'], files)
  const handleOnPress = useCallback(() => onPress(id), [id, onPress])

  return (
    <Base key={id} onPress={handleOnPress}>
      {image && <Cover source={image} width={40} height={40} />}

      <Middle>
        <Content noImage={!image}>
          <Text numberOfLines={1}>{title}</Text>
          <Followers color="neutral" followers={followers.totalCount} />
        </Content>
      </Middle>
    </Base>
  )
}

export default Project
