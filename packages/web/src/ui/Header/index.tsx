import * as React from 'react'
import Link from 'next/link'
import { Base, Nav, Search } from './styles'

const Header = () => (
  <Base>
    <Link href="/">
      <img src="/static/logo.svg" alt="Wrench" />
    </Link>

    <Search />

    <Nav>
      <Link href="/">
        <a>Feed</a>
      </Link>
      <Link href="/explore">
        <a>Explore</a>
      </Link>
    </Nav>
  </Base>
)

export default Header
