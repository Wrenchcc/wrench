import axios from 'axios'

const API_ENDPOINT = 'https://graph.facebook.com'
const API_VERSION = 'v3.2'
const FIELDS = 'id,email,name,first_name,last_name,picture.type(large)'

export const getAccountData = async facebookToken => {
  const result = await axios.get(
    `${API_ENDPOINT}/${API_VERSION}/me?fields=${FIELDS}&access_token=${facebookToken}`
  )

  return {
    avatarUrl: result.data.picture.data.url,
    email: result.data.email,
    firstName: result.data.first_name,
    fullName: result.data.name,
    id: result.data.id,
    lastName: result.data.last_name,
  }
}
