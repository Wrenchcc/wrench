// @ts-nocheck
import React, { Fragment, useState, useRef } from 'react'
import Link from 'next/link'
import * as ms from 'ms'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { withRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import useOutsideClick from '@rooks/use-outside-click'
import Badge from 'ui/Badge'
import { CURRENT_USER } from 'graphql/queries/user/currentUser'
import { UNREAD_NOTIFICATIONS } from 'graphql/queries/notifications/unreadNotifications'
import { MARK_ALL_NOTIFICATIONS_SEEN } from 'graphql/mutations/notifications/markAllNotificationsSeen'
import { Modal, useModal } from 'ui/Modal'
import Login from 'components/Login'
import Logout from 'components/Logout'
import Notifications from 'components/Notifications'
import {
  Base,
  Nav,
  NavLink,
  Search,
  Avatar,
  Right,
  UserMenu,
  UserNotifications,
  Separator,
  OpenMobileMenu,
} from './styles'

function Header({ router, isAuthenticated }) {
  const { t } = useTranslation()
  const { data } = useQuery(UNREAD_NOTIFICATIONS, {
    pollInterval: ms('1m'),
    skip: !isAuthenticated,
  })

  const currentUser = useQuery(CURRENT_USER, {
    skip: !isAuthenticated,
  })

  const [openUserMenu, setUserMenu] = useState(false)

  const toggleMenu = () => {
    setUserMenu(!openUserMenu)
  }

  const logoutRef = useRef()
  useOutsideClick(logoutRef, () => setUserMenu(false))

  const [openNotifications, setNotificationsMenu] = useState(false)

  const [markNotificationsSeen] = useMutation(MARK_ALL_NOTIFICATIONS_SEEN)

  const toggleNotifications = () => {
    if (data.notifications && data.notifications.unreadCount > 0) {
      // @ts-ignore
      markNotificationsSeen({
        update: proxy => {
          const data = proxy.readQuery({ query: UNREAD_NOTIFICATIONS })

          const notifications = {
            ...data,
            notifications: {
              ...data.notifications,
              unreadCount: 0,
            },
          }

          proxy.writeQuery({
            query: UNREAD_NOTIFICATIONS,
            data: notifications,
          })
        },
      })
    }

    setNotificationsMenu(!openNotifications)
  }

  const notificationsRef = useRef()
  useOutsideClick(notificationsRef, () => setNotificationsMenu(false))

  const inverted = (!isAuthenticated && router.route === '/') || router.route === '/download'

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

      <OpenMobileMenu inverted={inverted}>
        <img src={inverted ? require('./menu-white.svg') : require('./menu.svg')} alt="Wrench" />
      </OpenMobileMenu>

      <Search inverted={inverted} />

      <Nav>
        {nav.map(({ title, href, requireAuth }) => {
          if (!isAuthenticated && requireAuth) {
            return null
          }

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
        {currentUser.data && currentUser.data.user ? (
          <Fragment>
            <UserNotifications ref={notificationsRef} onClick={toggleNotifications}>
              <Badge />
              {openNotifications && <Notifications />}
            </UserNotifications>

            <UserMenu ref={logoutRef} onClick={toggleMenu}>
              <Avatar size={40} uri={currentUser.data.user.avatarUrl} style={{ zIndex: 100 }} />
              {openUserMenu && <Logout username={currentUser.data.user.username} />}
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
              {t('Header:login')}
            </NavLink>
            <Separator inverted={inverted}>/</Separator>
            <NavLink inverted={inverted} onClick={showModal} last>
              {t('Header:register')}
            </NavLink>
          </Fragment>
        )}
      </Right>
    </Base>
  )
}

export default withRouter(Header)
