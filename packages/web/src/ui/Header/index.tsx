import * as React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { Base, Nav, NavLink, Search } from './styles'

const links = [
  {
    href: '/',
    title: 'Feed',
  },
  {
    href: '/explore',
    title: 'Explore',
  },
]

function Header({ router }) {
  return (
    <Base>
      <Link href="/">
        <img src="/static/logo.svg" alt="Wrench" />
      </Link>

      <Search />

      <Nav>
        {links.map(({ title, href }) => (
          <Link passHref href={href} key={href}>
            <NavLink active={router.pathname === href}>{title}</NavLink>
          </Link>
        ))}
      </Nav>
    </Base>
  )
}

export default withRouter(Header)
