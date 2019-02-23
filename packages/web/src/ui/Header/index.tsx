import * as React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { Base, Nav, NavLink, Search } from './styles'

function Header({ router }) {
  return (
    <Base>
      <Link href="/">
        <img src="/static/logo.svg" alt="Wrench" />
      </Link>

      <Search />

      <Nav>
        <Link passHref href="/">
          <NavLink active={router.pathname === '/'}>Feed</NavLink>
        </Link>
        <Link passHref href="/explore">
          <NavLink active={router.pathname === '/explore'}>Explore</NavLink>
        </Link>
      </Nav>
    </Base>
  )
}

export default withRouter(Header)
