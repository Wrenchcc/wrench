// @ts-nocheck
import React, { Fragment, useState, useRef } from 'react'
import Link from 'next/link'
import * as ms from 'ms'
import { useCurrentUserQuery, useUnreadNotificationsQuery } from '@wrench/common'
import { LogoIcon, MenuIcon } from '@wrench/ui'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useTranslation } from 'i18n'
import { useClickOutside } from 'hooks'
import Badge from 'ui/Badge'
import { Modal, useModal } from 'ui/Modal'
import Login from 'components/Login'
import Logout from 'components/Logout'
import Notifications from 'components/Notifications'
import MobileMenu from 'components/MobileMenu'
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

function Header({ isAuthenticated }) {
  const router = useRouter()
  const { systemTheme } = useTheme()
  const { t } = useTranslation('header')
  const { data } = useUnreadNotificationsQuery({
    pollInterval: ms('1m'),
    skip: !isAuthenticated,
  })

  const currentUser = useCurrentUserQuery({
    skip: !isAuthenticated,
  })

  const [openUserMenu, setUserMenu] = useState(false)
  const [isMobileMenuOpen, setMobileMenu] = useState(false)
  const toggleMobileMenu = () => setMobileMenu(!isMobileMenuOpen)

  const toggleMenu = () => {
    setUserMenu(!openUserMenu)
  }

  const logoutRef = useRef()
  useClickOutside(logoutRef, () => setUserMenu(false))

  const [openNotifications, setNotificationsMenu] = useState(false)

  const handleClose = () => {
    setUserMenu(false)
    setNotificationsMenu(false)
  }

  const toggleNotifications = () => {
    setNotificationsMenu(!openNotifications)
  }

  const notificationsRef = useRef()
  useClickOutside(notificationsRef, () => setNotificationsMenu(false))

  const inverted = (!isAuthenticated && router.route === '/') || router.route === '/download'
  const background = router.route === '/business' && '#232428'

  const [showModal, closeModal] = useModal(() => (
    <Modal close={closeModal}>
      <Login closeModal={closeModal} />
    </Modal>
  ))

  const nav = [
    {
      href: '/',
      requireAuth: true,
      title: t('feed'),
    },
    {
      href: '/explore',
      title: t('explore'),
    },
  ]

  return (
    <Base inverted={inverted} background={background}>
      <Link passHref href={'/'}>
        <a>
          <LogoIcon
            style={{ cursor: 'pointer' }}
            width="40"
            height="40"
            inverted={systemTheme === 'light' && inverted ? true : false}
          />
        </a>
      </Link>

      <OpenMobileMenu inverted={inverted} onClick={toggleMobileMenu}>
        <MenuIcon inverted={inverted} />
      </OpenMobileMenu>

      {isMobileMenuOpen && (
        <MobileMenu isAuthenticated={isAuthenticated} onClose={toggleMobileMenu} />
      )}

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
        {currentUser?.data?.user ? (
          <Fragment>
            <UserNotifications ref={notificationsRef}>
              <Badge unread={data?.notifications?.unreadCount > 0} onPress={toggleNotifications} />
              {openNotifications && <Notifications onPress={handleClose} />}
            </UserNotifications>

            <UserMenu ref={logoutRef}>
              <Avatar
                size={40}
                uri={currentUser.data.user.avatarUrl}
                style={{ zIndex: 100 }}
                onPress={toggleMenu}
              />
              {openUserMenu && (
                <Logout username={currentUser.data.user.username} onPress={handleClose} />
              )}
            </UserMenu>
          </Fragment>
        ) : (
          <Fragment>
            <Link passHref href="/download">
              <NavLink inverted={inverted} active={router.pathname === '/download'}>
                {t('download')}
              </NavLink>
            </Link>
            <NavLink inverted={inverted} onClick={showModal}>
              {t('login')}
            </NavLink>
            <Separator inverted={inverted}>/</Separator>
            <NavLink inverted={inverted} onClick={showModal} last>
              {t('register')}
            </NavLink>
          </Fragment>
        )}
      </Right>
    </Base>
  )
}

export default Header
