import { PLATFORM_TYPES } from 'utils/enums'
import { logError } from 'utils/sentry'
import {
  client,
  REGISTER_DEVICE_TOKEN_MUTATION,
  CURRENT_USER_QUERY,
  PRE_SING_URLS_MUTATION,
} from './'

export async function registerDeviceToken(token) {
  try {
    await client.mutate({
      mutation: REGISTER_DEVICE_TOKEN_MUTATION,
      variables: {
        platform: PLATFORM_TYPES.MOBILE,
        token,
      },
    })
  } catch (err) {
    logError(errr)
  }
}

export async function preSignUrls(input) {
  try {
    await client.mutate({
      mutation: PRE_SING_URLS_MUTATION,
      variables: { input },
    })
  } catch (err) {
    logError(errr)
  }
}

export async function getCurrentUser() {
  try {
    return client.query({ query: CURRENT_USER_QUERY })
  } catch (err) {
    logError(errr)
  }
}
