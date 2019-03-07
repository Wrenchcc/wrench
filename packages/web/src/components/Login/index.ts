import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useMutation, useApolloClient } from 'react-apollo-hooks'
import { useTranslation } from 'react-i18next'
import { setAccessToken } from '../../graphql/utils/auth'
import { Title } from '../../ui'
import { AUTHENTICATE_USER } from '../../graphql/mutations/user/authenticate'
import { CURRENT_USER } from '../../graphql/queries/user/currentUser'
import { Base, Description, FacebookButton } from './styles'

export default function Login() {
  const { t } = useTranslation()
  const client = useApolloClient()
  const handleAuth = useMutation(AUTHENTICATE_USER)

  return (
    <Base>
      <Title fontSize={36} lineHeight={42}>
        {t('Login:title')}
      </Title>

      <Description color="grey">{t('Login:description')}</Description>

      <FacebookLogin
        appId="1174076712654826"
        fields="name,email,picture"
        callback={({ accessToken }) => handleAuth({
          update: (proxy, { data }) => {
            setAccessToken(data.authenticate.access_token)

            setTimeout(async () => {
              await client.query({
                query: CURRENT_USER,
              })
            }, 2000)
          },
          variables: {
            facebookToken: accessToken,
            platform: 'WEB',
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
