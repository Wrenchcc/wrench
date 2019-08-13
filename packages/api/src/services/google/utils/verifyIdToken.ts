import axios from 'axios'
import client from '../client'

const { GOOGLE_CLIENT_ID } = process.env

export default async function verifyIdToken(token, code) {
  try {
    const data = await client.verifyIdToken({
      audience: GOOGLE_CLIENT_ID,
      idToken: token,
    })

    const { tokens } = await client.getToken(code)
    const url = `https://people.googleapis.com/v1/people/me?personFields=photos&access_token=${tokens.access_token}`

    const result = await axios.get(url)

    console.log(result.data.photos[0].default)

    return data.getPayload()
  } catch (err) {
    console.log(err)
  }
}
