// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { useModal, Modal } from 'ui/Modal'
import Login from 'components/Login'
import { Base, Nav, NavLink, Close } from './styles'

function MobileMenu({ isAuthenticated, onClose }) {
  const client = useApolloClient()
  const router = useRouter()
  const { t } = useTranslation()

  const [showModal, closeModal] = useModal(() => (
    <Modal close={closeModal}>
      <Login closeModal={closeModal} />
    </Modal>
  ))

  const nav = [
    {
      href: '/',
      requireAuth: true,
      title: t('MobileMenu:feed'),
    },
    {
      href: '/explore',
      title: t('MobileMenu:explore'),
    },
    {
      onlyPublic: true,
      openModal: showModal,
      title: t('MobileMenu:login'),
    },
    {
      onlyPublic: true,
      openModal: showModal,
      title: t('MobileMenu:register'),
    },
    {
      requireAuth: true,
      signOut: () => {
        client.resetStore()
        onClose()
      },
      title: t('MobileMenu:signout'),
    },
    {
      href: '/download',
      title: t('MobileMenu:download'),
      last: true,
    },
  ]

  return (
    <Base>
      <Link href="/">
        <a>
          <img src={require('./logo-white.svg')} alt="Wrench" />
        </a>
      </Link>

      <Close onClick={onClose}>
        <img src={require('./close.svg')} alt="Close menu" />
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
            return <NavLink onClick={openModal}>{title}</NavLink>
          }

          if (signOut) {
            return <NavLink onClick={signOut}>{title}</NavLink>
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
