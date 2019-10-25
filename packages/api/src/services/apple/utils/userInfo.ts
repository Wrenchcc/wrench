import * as jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import * as util from 'util'

const debug = require('debug')('api:services:apple:utils:userInfo')

const AUTH_KEY_ENDPOINT = 'https://appleid.apple.com/auth/keys'
const APPLE_ISSUER = 'https://appleid.apple.com'
const APP_IDENTIFYER = 'cc.wrench.app'

const client = jwksClient({
  jwksUri: AUTH_KEY_ENDPOINT,
})

const getSigningKeysAsync = util.promisify(client.getSigningKey)

export default async identityToken => {
  try {
    const decoded = jwt.decode(identityToken, {
      complete: true,
    })

    const { kid, alg } = decoded.header

    const key = await getSigningKeysAsync(kid)
    const publicKey = (key as jwksClient.RsaSigningKey).rsaPublicKey

    const data = jwt.verify(identityToken, publicKey, {
      issuer: APPLE_ISSUER,
      audience: APP_IDENTIFYER,
      algorithms: [alg],
    })

    return {
      id: data.sub,
      email: data.email,
    }
  } catch (err) {
    debug(err)
  }
}
