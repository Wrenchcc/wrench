import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useMutation } from 'react-apollo-hooks'
import { useTranslation } from 'react-i18next'
import Router from 'next/router'
import { setAccessToken, setRefreshToken } from '../../graphql/utils/auth'
import { Title } from '../../ui'
import { AUTHENTICATE_FACEBOOK } from '../../graphql/mutations/user/authenticateFacebook'
import { Base, Description, FacebookButton } from './styles'

const FACEBOOK_APP_ID = '1174076712654826'
const FACEBOOK_SCOPE = 'public_profile,email'

export default function Login({ closeModal }) {
  const { t } = useTranslation()
  const handleAuth = useMutation(AUTHENTICATE_FACEBOOK)

  return (
    <Base>
      <Title fontSize={36} lineHeight={42}>
        {t('Login:title')}
      </Title>

      <Description color="grey">{t('Login:description')}</Description>

      <FacebookLogin
        appId={FACEBOOK_APP_ID}
        fields={FACEBOOK_SCOPE}
        callback={({ accessToken }) => handleAuth({
          update: (proxy, { data }) => {
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
          <FacebookButton onClick={onClick}>Login with Facebook</FacebookButton>
        )}
      />
    </Base>
  )
}
