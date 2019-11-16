import { useEffect } from 'react'
import { useScript } from 'hooks'

const APPLE_SIGN_IN_JS_CDN_URL =
  'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js'

declare namespace AppleID {
  let auth: {
    signIn: () => void
    init: (props: AppleSignInConfig) => void
  }
}

export interface AppleSignInConfig {
  clientId: string
  scope: string
  redirectURI: string
  state: string
}

export function useAppleSignIn({ clientId, scope, redirectURI, state }: AppleSignInConfig) {
  const [loaded, error] = useScript(APPLE_SIGN_IN_JS_CDN_URL)

  const signInToApple = () => AppleID.auth.signIn()

  useEffect(() => {
    if (loaded && !error) {
      AppleID.auth.init({ clientId, scope, redirectURI, state })
    }
  }, [loaded])

  return { loaded, error, signIn: signInToApple }
}

export const AppleSignIn: React.FunctionComponent<AppleSignInConfig> = ({ children, ...props }) => {
  const appleSignIn = useAppleSignIn(props)

  if (children && typeof children === 'function') {
    return children(appleSignIn)
  }

  return null
}

export default AppleSignIn
