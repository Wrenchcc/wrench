import React from 'react'
import Link from 'next/link'
import { Base } from './styles'

function Logout({ username }) {
  return (
    <Base>
      <Link
        href={{
          pathname: '/user',
          query: { username },
        }}
        as={{
          pathname: `/${username}`,
        }}
      >
        <a>Profile</a>
      </Link>
      <Link href="/settings">
        <a>Settings</a>
      </Link>
      <Link href="/logout">
        <a>Logout</a>
      </Link>
    </Base>
  )
}

export default Logout
