// @ts-nocheck
import React from 'react'
import { useAuthenticateFacebookMutation, useAuthenticateGoogleMutation } from '@wrench/common'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import styled from 'styled-components'
import useLocalStorage from '../../utils/useLocalStorage'

export const Headline = styled.h1`
  font-size: 24px;
  font-weight: 500;
`

const Base = styled.div`
  background: black;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Box = styled.div`
  width: 500px;
  background: white;
  padding: 50px;
  box-sizing: border-box;
`

const FacebookButton = styled.button`
  background: #3b5998;
  height: 50px;
  width: 100%;
  color: white;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  border: none;
  margin-top: 40px;
  margin-bottom: 20px;
`

const GoogleButton = styled.button`
  background: white;
  border: solid 1px #a8a8ad;
  height: 50px;
  width: 100%;
  color: white;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  color: black;
`

const FACEBOOK_APP_ID = '1174076712654826'
const FACEBOOK_SCOPE = 'public_profile,email'

function Login({ setAuthenticated }) {
  const [authenticateFacebook] = useAuthenticateFacebookMutation()
  const [authenticateGoogle] = useAuthenticateGoogleMutation()
  const [, setAccessToken] = useLocalStorage('access_token')
  const [, setRefreshToken] = useLocalStorage('refresh_token')

  return (
    <Base>
      <Box>
        <Headline>Choose sign in method. </Headline>

        <FacebookLogin
          appId={FACEBOOK_APP_ID}
          redirectUri="https://admin.wrench.cc"
          fields={FACEBOOK_SCOPE}
          callback={({ accessToken }) =>
            authenticateFacebook({
              update: (_, { data }) => {
                setAccessToken(data.authenticateFacebook.access_token)
                setRefreshToken(data.authenticateFacebook.refresh_token)
                setAuthenticated(true)
              },
              variables: {
                token: accessToken,
              },
            })
          }
          render={({ onClick }) => (
            <FacebookButton onClick={onClick}>Continue with Facebook</FacebookButton>
          )}
        />

        <GoogleLogin
          responseType="id_token"
          clientId="407610377102-dsuursv0qn83s4v2vnqfevm511ujp81t.apps.googleusercontent.com"
          render={renderProps => (
            <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
              Continue with Google
            </GoogleButton>
          )}
          onSuccess={({ tokenId }) =>
            authenticateGoogle({
              update: (_, { data }) => {
                setAccessToken(data.authenticateFacebook.access_token)
                setRefreshToken(data.authenticateFacebook.refresh_token)
                setAuthenticated(true)
              },
              variables: {
                idToken: tokenId,
              },
            })
          }
          onFailure={res => console.log(res)}
          cookiePolicy={'single_host_origin'}
        />
      </Box>
    </Base>
  )
}

export default Login
