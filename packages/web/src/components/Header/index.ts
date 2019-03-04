import React, { Fragment } from 'react'
import Link from 'next/link'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import { withRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Badge from '../../ui/Badge'
import { CURRENT_USER } from '../../graphql/queries/user/currentUser'
import { setTokens } from '../../graphql/utils/auth'
import { AUTHENTICATE_USER } from '../../graphql/mutations/user/authenticate'
import { Base, Nav, NavLink, Search, Avatar, Right } from './styles'

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
  const { data } = useQuery(CURRENT_USER)
  const handleAuth = useMutation(AUTHENTICATE_USER)
  // const client = useApolloClient()

  const links = [
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
    <Base>
      <Link href="/">
        <img src={require('./logo.svg')} alt="Wrench" />
      </Link>

      <Search />

      <Nav>
        {links.map(({ title, href, requireAuth }) => {
          if (!data.user && requireAuth) return null
          return (
            <Link passHref href={href} key={href}>
              <NavLink active={router.pathname === href}>{title}</NavLink>
            </Link>
          )
        })}
      </Nav>

      <Right>
        {data.user ? (
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
              <NavLink>Download app</NavLink>
            </Link>
            <Link>
              <NavLink>Log in</NavLink>
            </Link>
            <Link>
              <NavLink>Sign up</NavLink>
            </Link>
          </Fragment>
        )}
      </Right>
    </Base>
  )
}

export default withRouter(Header)
