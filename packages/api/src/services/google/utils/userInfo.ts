import axios from 'axios'
import { pathOr } from 'ramda'
import client from '../client'

const debug = require('debug')('api:userInfo')

const { GOOGLE_CLIENT_ID } = process.env

const API_ENDPOINT = 'https://people.googleapis.com'
const API_VERSION = 'v1'
const FIELDS = 'photos'

export default async function userInfo(token, code) {
  try {
    const data = await client.verifyIdToken({
      audience: GOOGLE_CLIENT_ID,
      idToken: token,
    })

    const payload = data.getPayload()

    if (payload.aud !== GOOGLE_CLIENT_ID) {
      return null
    }

    const { tokens } = await client.getToken(code)

    const result = await axios.get(
      `${API_ENDPOINT}/${API_VERSION}/people/me?personFields=${FIELDS}&access_token=${tokens.access_token}`
    )

    return {
      avatarUrl: pathOr(true, ['data', 'photos', 0, 'url'], result),
      email: payload.email,
      firstName: payload.given_name,
      fullName: payload.name,
      id: payload.sub,
      isSilhouette: pathOr(false, ['data', 'photos', 0, 'default'], result),
      lastName: payload.family_name,
    }
  } catch (err) {
    debug(err)
  }
}
