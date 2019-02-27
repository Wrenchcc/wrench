import React, { Fragment } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useMutation } from 'react-apollo-hooks'
import Seo from '../utils/seo'
import { AUTHENTICATE_USER } from '../graphql/mutations/user/authenticate'

export default function Home() {
  return (
    <Fragment>
      <Seo
        config={{
          title: 'Feed',
        }}
      />
      <FacebookLogin
        appId="1174076712654826"
        autoLoad
        fields="name,email,picture"
        callback={({ accessToken }) => useMutation(AUTHENTICATE_USER, {
          update: (proxy, mutationResult) => {
            console.log(mutationResult)
          },
          variables: {
            facebookToken: accessToken,
            platform: 'WEB',
          },
        })
        }
        render={({ onClick }) => <button onClick={onClick}>Login with Facebook2</button>}
      />
    </Fragment>
  )
}
