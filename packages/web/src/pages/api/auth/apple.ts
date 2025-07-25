import { pathOr } from 'rambda'
import fetch from 'isomorphic-unfetch'
import { Cookies } from 'services/cookie'
import { serialize } from 'cookie'

// const API_ENDPOINT = 'https://api.wrench.cc/graphql'

export default async function handle({ body }, res) {
  try {
    const response = await fetch('https://api.wrench.cc/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation ($identityToken: String!, $user: ApplePayload!) {
            authenticateApple(identityToken: $identityToken, user: $user) {
              access_token
              refresh_token
            }
          }
        `,
        variables: {
          identityToken: body.id_token,
          user: {
            firstName: pathOr(null, ['user', 'firstName'], body),
            lastName: pathOr(null, ['user', 'lastName'], body),
          },
        },
      }),
    })

    const { data } = await response.json()

    if (data.authenticateApple) {
      res.setHeader('Set-Cookie', [
        serialize(Cookies.ACCESS_TOKEN, data.authenticateApple.access_token, {
          path: '/',
        }),
        serialize(Cookies.REFRESH_TOKEN, data.authenticateApple.refresh_token, {
          path: '/',
        }),
      ])

      res.writeHead(302, {
        Location: '/feed',
      })

      res.end()
    }
  } catch (err) {
    console.log(err)

    res.writeHead(302, {
      Location: '/',
    })

    res.end()
  }
}
