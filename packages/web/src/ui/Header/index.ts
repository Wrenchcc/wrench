import * as React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import Badge from '../Badge'
import { Base, Nav, NavLink, Search, Avatar, Right } from './styles'

function Header({ router }) {
  const { t } = useTranslation()

  const links = [
    {
      href: '/',
      title: t('Header:feed'),
    },
    {
      href: '/explore',
      title: t('Header:explore'),
    },
  ]

  return (
    <Base>
      <Link href="/">
        <img src={require('./logo.svg')} alt="Wrench" />
      </Link>

      <Search />

      <Nav>
        {links.map(({ title, href }) => (
          <Link passHref href={href} key={href}>
            <NavLink active={router.pathname === href}>{title}</NavLink>
          </Link>
        ))}
      </Nav>

      <Right>
        <Badge />

        <Avatar
          size={40}
          uri="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10154469969811953&height=200&width=200&ext=1551825024&hash=AeTR1gsNZaSpjTjh"
        />
      </Right>
    </Base>
  )
}

export default withRouter(Header)
