import * as jwt from 'jsonwebtoken'
import * as jwksClient from 'jwks-rsa'

const client = jwksClient({
  jwksUri: 'https://appleid.apple.com/auth/keys',
})

export default async identityToken => {
  const decoded = jwt.decode(identityToken, {
    complete: true,
  })

  const { kid, alg } = decoded.header

  client.getSigningKey(kid, (err, key) => {
    if (err) {
      console.log(err)
      return
    }

    const publicKey = (key as jwksClient.RsaSigningKey).rsaPublicKey

    try {
      jwt.verify(
        identityToken,
        publicKey,
        {
          issuer: 'https://appleid.apple.com',
          audience: 'cc.wrench.app',
          algorithms: [alg],
        },
        (err, user) => {
          if (err) {
            console.log(err)
            return
          }

          return user
        }
      )
    } catch (err) {
      console.log(err)
    }
  })
}
