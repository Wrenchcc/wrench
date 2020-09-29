import client from '../client'

const debug = require('debug')('api:userInfo')

const { GOOGLE_CLIENT_ID } = process.env

export default async function userInfo(idToken) {
  try {
    const data = await client.verifyIdToken({
      audience: GOOGLE_CLIENT_ID,
      idToken,
    })

    const payload = data.getPayload()

    if (payload.aud !== GOOGLE_CLIENT_ID) {
      return null
    }

    return {
      avatarUrl: null,
      email: payload.email,
      firstName: payload.given_name,
      fullName: payload.name,
      id: payload.sub,
      isSilhouette: true,
      lastName: payload.family_name || '',
    }
  } catch (err) {
    debug(err)
  }
}
