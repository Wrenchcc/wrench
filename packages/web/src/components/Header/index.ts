import React, { Fragment } from 'react'
import Link from 'next/link'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import { withRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import Badge from '../../ui/Badge'
import { CURRENT_USER } from '../../graphql/queries/user/currentUser'
import { Modal, useModal } from '../../ui/Modal'
import Login from '../Login'
import { Base, Nav, NavLink, Search, Avatar, Right } from './styles'

function Header({ router, isAuthenticated }) {
  const { t } = useTranslation()
  const { data } = useQuery(CURRENT_USER, {
    skip: !isAuthenticated,
  })

  // const client = useApolloClient()
  const inverted = !isAuthenticated && router.route === '/'

  const [showModal, closeModal] = useModal(() => (
    <Modal close={closeModal}>
      <Login />
    </Modal>
  ))

  const nav = [
    {
      href: '/',
      requireAuth: true,
      title: t('Header:feed'),
    },
    {
      href: '/explore',
      title: t('Header:explore'),
    },
  ]

  return (
    <Base inverted={inverted}>
      <Link href="/">
        <img src={inverted ? require('./logo-white.svg') : require('./logo.svg')} alt="Wrench" />
      </Link>

      <Search inverted={inverted} />

      <Nav>
        {nav.map(({ title, href, requireAuth }) => {
          if (!false && requireAuth) return null
          return (
            <Link passHref href={href} key={href}>
              <NavLink inverted={inverted} active={router.pathname === href}>
                {title}
              </NavLink>
            </Link>
          )
        })}
      </Nav>

      <Right>
        {false ? (
          <Fragment>
            <Badge />

            <Link
              href={{
                pathname: '/user',
                query: { username: data.user.username },
              }}
              as={{
                pathname: `/${data.user.username}`,
              }}
            >
              <a>
                <Avatar size={40} uri={data.user.avatarUrl} />
              </a>
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link passHref href="/download">
              <NavLink inverted={inverted} active={router.pathname === '/download'}>
                {t('Header:download')}
              </NavLink>
            </Link>
            <NavLink inverted={inverted} onClick={showModal}>
              {t('Header:signin')}
            </NavLink>
          </Fragment>
        )}
      </Right>
    </Base>
  )
}

export default withRouter(Header)
