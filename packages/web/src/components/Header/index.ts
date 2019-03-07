import React, { Fragment, useState, useRef } from 'react'
import Link from 'next/link'
import { useQuery } from 'react-apollo-hooks'
import { withRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import useOutsideClick from '@rooks/use-outside-click'
import Badge from '../../ui/Badge'
import { CURRENT_USER } from '../../graphql/queries/user/currentUser'
import { Modal, useModal } from '../../ui/Modal'
import Login from '../Login'
import Logout from '../Logout'
import Notifications from '../Notifications'
import { Base, Nav, NavLink, Search, Avatar, Right, UserMenu, UserNotifications } from './styles'

function Header({ router, isAuthenticated }) {
  const { t } = useTranslation()
  const { data } = useQuery(CURRENT_USER, {
    skip: !isAuthenticated,
  })

  const [openUserMenu, setUserMenu] = useState(false)

  const toggleMenu = () => {
    setUserMenu(!openUserMenu)
  }

  const logoutRef = useRef()
  useOutsideClick(logoutRef, () => setUserMenu(false))

  const [openNotifications, setNotificationsMenu] = useState(false)

  const toggleNotifications = () => {
    setNotificationsMenu(!openNotifications)
  }

  const notificationsRef = useRef()
  useOutsideClick(notificationsRef, () => setNotificationsMenu(false))

  const inverted = !isAuthenticated && router.route === '/'

  const [showModal, closeModal] = useModal(() => (
    <Modal close={closeModal}>
      <Login closeModal={closeModal} />
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
        <a>
          <img src={inverted ? require('./logo-white.svg') : require('./logo.svg')} alt="Wrench" />
        </a>
      </Link>

      <Search inverted={inverted} />

      <Nav>
        {nav.map(({ title, href, requireAuth }) => {
          if (!isAuthenticated && requireAuth) return null
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
        {data && data.user ? (
          <Fragment>
            <UserNotifications ref={notificationsRef} onClick={toggleNotifications}>
              <Badge />
              {openNotifications && <Notifications />}
            </UserNotifications>

            <UserMenu ref={logoutRef} onClick={toggleMenu}>
              <Avatar size={40} uri={data.user.avatarUrl} style={{ zIndex: 100 }} />
              {openUserMenu && <Logout username={data.user.username} />}
            </UserMenu>
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
