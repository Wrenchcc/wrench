import React, { Fragment } from 'react'
import Link from 'next/link'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import { withRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Badge from '../../ui/Badge'
import { CURRENT_USER } from '../../graphql/queries/user/currentUser'
import { setTokens } from '../../graphql/utils/auth'
import { useModal } from '../../ui/Modal'
import { AUTHENTICATE_USER } from '../../graphql/mutations/user/authenticate'
import { Base, Nav, NavLink, Search, Avatar, Right } from './styles'

// const [showModal, hideModal] = useModal(() => (
//     <ReactModal isOpen>
//       <p>Modal content</p>
//       <button onClick={hideModal}>Hide modal</button>
//     </ReactModal>
//   ));
//
//   return <button onClick={showModal}>Show modal</button>;
// <FacebookLogin
//   appId="1174076712654826"
//   fields="name,email,picture"
//   callback={({ accessToken }) => handleAuth({
//     update: (proxy, { data }) => {
//       setTokens(data.authenticate)
//
//       // setTimeout(async () => {
//       //   await client.query({
//       //     query: CURRENT_USER,
//       //   })
//       // }, 1000)
//     },
//     variables: {
//       facebookToken: accessToken,
//       platform: 'WEB',
//     },
//   })
//   }
//   render={({ onClick }) => <button onClick={onClick}>Login with Facebook</button>}
// />

function Header({ router }) {
  const { t } = useTranslation()
  // const { data } = useQuery(CURRENT_USER)
  const handleAuth = useMutation(AUTHENTICATE_USER)
  // const client = useApolloClient()

  const [showModal] = useModal(() => (
    <div style={{ width: '200px', height: '200px', position: 'absolute', background: 'black' }} />
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

  const links = [
    {
      href: '/download',
      title: t('Header:download'),
    },
    {
      href: '/login',
      onPress: showModal,
      title: t('Header:login'),
    },
    {
      href: '/sign-up',
      title: t('Header:signup'),
    },
  ]

  return (
    <Base>
      <Link href="/">
        <img src={require('./logo.svg')} alt="Wrench" />
      </Link>

      <Search />

      <Nav>
        {nav.map(({ title, href, requireAuth }) => {
          if (!false && requireAuth) return null
          return (
            <Link passHref href={href} key={href}>
              <NavLink active={router.pathname === href}>{title}</NavLink>
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
            {links.map(({ title, href, onPress }) => (
              <Link passHref href={href} key={href} onClick={onPress}>
                <NavLink active={router.pathname === href}>{title}</NavLink>
              </Link>
            ))}
          </Fragment>
        )}
      </Right>
    </Base>
  )
}

export default withRouter(Header)
