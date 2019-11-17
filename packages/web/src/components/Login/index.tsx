// @ts-nocheck
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'
import { useMutation } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import Router from 'next/router'
import { Title } from 'ui'
import { useCookie, Cookies } from 'hooks'
import { AUTHENTICATE_FACEBOOK, AUTHENTICATE_GOOGLE } from 'graphql/mutations/user/authenticate'
import AppleSignIn from '../AppleSignIn'
import { Base, FacebookButton, AppleButton, GoogleButton } from './styles'

const { APPLE_REDRECT_URI } = process.env

const FACEBOOK_APP_ID = '1174076712654826'
const FACEBOOK_SCOPE = 'public_profile,email'

export default function Login({ closeModal }) {
  const { t } = useTranslation()
  const [handleFacebookAuth] = useMutation(AUTHENTICATE_FACEBOOK)
  const [handleGoogleAuth] = useMutation(AUTHENTICATE_GOOGLE)
  const [, setAccessToken] = useCookie(Cookies.ACCESS_TOKEN)
  const [, setRefreshToken] = useCookie(Cookies.REFRESH_TOKEN)

  return (
    <Base>
      <Title fontSize={36} lineHeight={42}>
        {t('Login:title')}
      </Title>

      <FacebookLogin
        appId={FACEBOOK_APP_ID}
        fields={FACEBOOK_SCOPE}
        callback={({ accessToken }) =>
          handleFacebookAuth({
            update: (_, { data }) => {
              closeModal()
              setAccessToken(data.authenticateFacebook.access_token)
              setRefreshToken(data.authenticateFacebook.refresh_token)
              Router.push('/')
            },
            variables: {
              token: accessToken,
            },
          })
        }
        render={({ onClick }) => (
          <FacebookButton onClick={onClick}>{t('Login:fbbutton')}</FacebookButton>
        )}
      />

      <AppleSignIn clientId="cc.wrench" scope="name email" redirectURI={APPLE_REDRECT_URI}>
        {({ signIn }) => <AppleButton onClick={signIn}>{t('Login:applebutton')}</AppleButton>}
      </AppleSignIn>

      <GoogleLogin
        responseType="id_token"
        clientId="407610377102-dsuursv0qn83s4v2vnqfevm511ujp81t.apps.googleusercontent.com"
        render={renderProps => (
          <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
            {t('Login:googlebutton')}
          </GoogleButton>
        )}
        onSuccess={({ tokenId }) =>
          handleGoogleAuth({
            update: (_, { data }) => {
              closeModal()
              setAccessToken(data.authenticateGoogle.access_token)
              setRefreshToken(data.authenticateGoogle.refresh_token)
              Router.push('/')
            },
            variables: {
              idToken: tokenId,
            },
          })
        }
        onFailure={res => console.log(res)}
        cookiePolicy={'single_host_origin'}
      />
    </Base>
  )
}
