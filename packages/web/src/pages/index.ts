import React, { Fragment } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useMutation, useQuery } from 'react-apollo-hooks'
import Seo from '../utils/seo'
import { setTokens } from '../graphql/utils/auth'
import { AUTHENTICATE_USER } from '../graphql/mutations/user/authenticate'
// import { CURRENT_USER } from '../graphql/queries/user/currentUser'

export default function Home() {
  const handleAuth = useMutation(AUTHENTICATE_USER)
  // const currentUser = useQuery(CURRENT_USER)

  return (
    <Fragment>
      <Seo config={{ title: 'Feed' }} />
      <FacebookLogin
        appId="1174076712654826"
        fields="name,email,picture"
        callback={({ accessToken }) => handleAuth({
          update: (proxy, { data }) => {
            setTokens(data.authenticate)
          },
          variables: {
            facebookToken: accessToken,
            platform: 'WEB',
          },
        })
        }
        render={({ onClick }) => <button onClick={onClick}>Login with Facebook</button>}
      />
    </Fragment>
  )
}
