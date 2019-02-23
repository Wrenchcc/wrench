import * as React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Base, Nav, NavLink, Search } from './styles'

function Header({ router }) {
  const links = [
    {
      href: '/',
      title: 'explore',
    },
    {
      href: '/explore',
      title: 'explore',
    },
  ]

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
