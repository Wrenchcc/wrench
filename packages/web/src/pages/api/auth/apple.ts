import { pathOr } from 'ramda'
import fetch from 'isomorphic-unfetch'
import { Cookies } from 'services/cookie'
import { serialize } from 'cookie'

const { API_ENDPOINT } = process.env

export default async function handle({ body }, res) {
  const mutation = JSON.stringify({
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
  })

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: mutation,
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

      res.writeHead(302, { Location: '/feed' })
      res.end()
    }
  } catch (err) {
    console.log(err)
  }

  res.writeHead(302, { Location: '/' })
  res.end()
}
