import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useMutation } from 'react-apollo-hooks'
import { useTranslation } from 'react-i18next'
import Router from 'next/router'
import { setAccessToken, setRefreshToken } from '../../graphql/utils/auth'
import { Title } from '../../ui'
import { AUTHENTICATE_USER } from '../../graphql/mutations/user/authenticate'
import { Base, Description, FacebookButton } from './styles'

const FB_APP_ID = '1174076712654826'
const PLATFORM = 'WEB'

export default function Login({ closeModal }) {
  const { t } = useTranslation()
  const handleAuth = useMutation(AUTHENTICATE_USER)

  return (
    <Base>
      <Title fontSize={36} lineHeight={42}>
        {t('Login:title')}
      </Title>

      <Description color="grey">{t('Login:description')}</Description>

      <FacebookLogin
        appId={FB_APP_ID}
        fields="name,email,picture"
        callback={({ accessToken }) => handleAuth({
          update: (proxy, { data }) => {
            closeModal()
            setAccessToken(data.authenticate.access_token)
            setRefreshToken(data.authenticate.refresh_token)
            Router.push('/')
          },
          variables: {
            facebookToken: accessToken,
            platform: PLATFORM,
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
