// @ts-nocheck
import React from 'react'
import Avatar from 'ui/Avatar'
import { Base, Users, User, Count } from './styles'

function UserStack({ users, size = 20 }) {
  return (
    <Base>
      <Users>
        {users.map(({ node }, index) => (
          <User first={index === 0} key={node.user.id} size={size}>
            <Avatar uri={node.user.avatarUrl} size={size} />
          </User>
        ))}
      </Users>
    </Base>
  )
}

export default UserStack
