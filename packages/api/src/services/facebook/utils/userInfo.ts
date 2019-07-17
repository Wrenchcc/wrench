import axios from 'axios'

const API_ENDPOINT = 'https://graph.facebook.com'
const API_VERSION = 'v3.2'
const FIELDS = 'id,email,name,first_name,last_name,picture{is_silhouette}'

export default async facebookToken => {
  const result = await axios.get(
    `${API_ENDPOINT}/${API_VERSION}/me?fields=${FIELDS}&access_token=${facebookToken}`
  )

  return {
    email: result.data.email,
    firstName: result.data.first_name,
    fullName: result.data.name,
    id: result.data.id,
    isSilhouette: result.data.picture.data.is_silhouette,
    lastName: result.data.last_name,
  }
}
