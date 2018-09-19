import fetch from 'node-fetch'

const API_ENDPOINT = 'https://graph.facebook.com'
const API_VERSION = 'v3.1'
const FIELDS = 'id,email,name,first_name,last_name,picture.type(large)'

export const getAccountData = facebookToken => fetch(`${API_ENDPOINT}/${API_VERSION}/me?fields=${FIELDS}&access_token=${facebookToken}`)
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      return Promise.reject(data.error.message)
    }
    return {
      avatarUrl: data.picture.data.url,
      firstName: data.first_name,
      fullName: data.name,
      id: data.id,
      lastName: data.last_name,
    }
  })
