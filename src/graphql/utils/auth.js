import { pathOr, pick } from 'ramda'
import { client } from 'graphql/createClient'
import getCurrentUserQuery from 'graphql/queries/getCurrentUser.graphql'
import getTokenQuery from 'graphql/queries/getToken.graphql'

export const getCurrentUser = async () => {
  const res = await client.query({ query: getCurrentUserQuery })
  return pathOr(null, ['data', 'currentUser'], res)
}

export const getToken = async () => {
  const res = await client.query({ query: getTokenQuery })
  return pick(['token', 'refreshToken'], res.data.currentUser)
}

export const refreshToken = async () => {
  // const res = await client.query({ query: getTokenQuery })
  // return pick(['token', 'refreshToken'], res.data.currentUser)
}

export const resetStore = () => {
  client.resetStore()
}
