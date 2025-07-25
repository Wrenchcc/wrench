// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/client'
import { useTranslation } from 'i18n'
import { CloseIcon, LogoIcon } from '@wrench/ui'
import { useModal, Modal } from 'ui/Modal'
import Login from 'components/Login'
import { Base, Nav, NavLink, Close } from './styles'

function MobileMenu({ isAuthenticated, onClose }) {
  const client = useApolloClient()
  const router = useRouter()
  const { t } = useTranslation('mobile-menu')

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
    {
      onlyPublic: true,
      openModal: showModal,
      title: t('login'),
    },
    {
      onlyPublic: true,
      openModal: showModal,
      title: t('register'),
    },
    {
      requireAuth: true,
      signOut: () => {
        client.resetStore()
        onClose()
      },
      title: t('sign_out'),
    },
    {
      href: '/download',
      title: t('download'),
      last: true,
    },
  ]

  return (
    <Base>
      <Link href="/">
        <LogoIcon width="40" height="40" white />
      </Link>

      <Close onClick={onClose}>
        <CloseIcon />
      </Close>

      <Nav>
        {nav.map(({ title, href, requireAuth, openModal, last, onlyPublic, signOut }) => {
          if (!isAuthenticated && requireAuth) {
            return null
          }

          if (isAuthenticated && onlyPublic) {
            return null
          }

          if (openModal) {
            return (
              <NavLink key={title} onClick={openModal}>
                {title}
              </NavLink>
            )
          }

          if (signOut) {
            return (
              <NavLink key={title} onClick={signOut}>
                {title}
              </NavLink>
            )
          }

          return (
            <Link passHref href={href} key={href}>
              <NavLink onClick={onClose} last={last} active={router.pathname === href}>
                {title}
              </NavLink>
            </Link>
          )
        })}
      </Nav>
    </Base>
  )
}

export default MobileMenu
