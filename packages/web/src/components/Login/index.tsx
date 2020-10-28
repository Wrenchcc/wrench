// @ts-nocheck
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'
import { useAuthenticateGoogleMutation, useAuthenticateFacebookMutation } from '@wrench/common'
import { useTranslation } from 'i18n'
import Router from 'next/router'
import { Title } from 'ui'
import { useCookie, Cookies } from 'hooks'
import AppleSignIn from '../AppleSignIn'
import Legal from '../Legal'
import { Base, FacebookButton, GoogleButton, AppleButton } from './styles'

const { APPLE_REDIRECT_URI } = process.env

const FACEBOOK_APP_ID = '1174076712654826'
const FACEBOOK_SCOPE = 'public_profile,email'

export default function Login({ closeModal, referral = '/' }) {
  const { t } = useTranslation('login')
  const [handleFacebookAuth] = useAuthenticateFacebookMutation()
  const [handleGoogleAuth] = useAuthenticateGoogleMutation()
  const [, setAccessToken] = useCookie(Cookies.ACCESS_TOKEN)
  const [, setRefreshToken] = useCookie(Cookies.REFRESH_TOKEN)

  return (
    <Base>
      <Title fontSize={36} lineHeight={42}>
        {t('title')}
      </Title>

      <FacebookLogin
        appId={FACEBOOK_APP_ID}
        redirectUri="https://wrench.cc/feed"
        fields={FACEBOOK_SCOPE}
        callback={({ accessToken }) =>
          handleFacebookAuth({
            update: (_, { data }) => {
              closeModal()
              setAccessToken(data.authenticateFacebook.access_token)
              setRefreshToken(data.authenticateFacebook.refresh_token)
              Router.push(referral)
            },
            variables: {
              token: accessToken,
            },
          })
        }
        render={({ onClick }) => (
          <FacebookButton onClick={onClick}>{t('fbbutton')}</FacebookButton>
        )}
      />

      <AppleSignIn clientId="cc.wrench" scope="name email" redirectURI={APPLE_REDIRECT_URI}>
        {({ signIn }) => <AppleButton onClick={signIn}>{t('applebutton')}</AppleButton>}
      </AppleSignIn>

      <GoogleLogin
        responseType="id_token"
        clientId="407610377102-dsuursv0qn83s4v2vnqfevm511ujp81t.apps.googleusercontent.com"
        render={(renderProps) => (
          <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
            {t('googlebutton')}
          </GoogleButton>
        )}
        onSuccess={({ tokenId }) =>
          handleGoogleAuth({
            update: (_, { data }) => {
              closeModal()
              setAccessToken(data.authenticateGoogle.access_token)
              setRefreshToken(data.authenticateGoogle.refresh_token)
              Router.push(referral)
            },
            variables: {
              idToken: tokenId,
            },
          })
        }
        onFailure={(res) => console.log(res)}
        cookiePolicy={'single_host_origin'}
      />

      <Legal />
    </Base>
  )
}
