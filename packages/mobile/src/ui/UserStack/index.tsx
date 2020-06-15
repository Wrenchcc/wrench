// @ts-nocheck
import React from 'react'
import Avatar from 'ui/Avatar'
import { Base, Users, User, Count } from './styles'

function UserStack({ users, onPress, size = 20 }) {
  return (
    <Base>
      <Users>
        {users.map(({ node }, index) => (
          <User first={index === 0} key={node.id} size={size}>
            <Avatar uri={node.avatarUrl} size={size} onPress={onPress} />
          </User>
        ))}
      </Users>
    </Base>
  )
}

export default UserStack
