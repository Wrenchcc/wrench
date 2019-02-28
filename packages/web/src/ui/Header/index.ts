import * as React from 'react'
import Link from 'next/link'
import { useQuery } from 'react-apollo-hooks'
import { withRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import Badge from '../Badge'
import { CURRENT_USER } from '../../graphql/queries/user/currentUser'
import { Base, Nav, NavLink, Search, Avatar, Right } from './styles'

function Header({ router }) {
  const { t } = useTranslation()
  const { data, loading, fetchMore } = useQuery(CURRENT_USER)

  if (loading) {
    return null
  }

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

        <Avatar size={40} uri={data.user.avatarUrl} />
      </Right>
    </Base>
  )
}

export default withRouter(Header)
