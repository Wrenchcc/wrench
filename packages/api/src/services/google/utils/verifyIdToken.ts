import client from '../client'

const { GOOGLE_CLIENT_ID } = process.env

export default async function verifyIdToken(token) {
  const data = await client.verifyIdToken({
    audience: GOOGLE_CLIENT_ID,
    idToken: token,
  })

  return data.getPayload()
}
