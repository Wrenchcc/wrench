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
    return client.mutate({
      mutation: REGISTER_DEVICE_TOKEN_MUTATION,
      variables: {
        platform: PLATFORM_TYPES.MOBILE,
        token,
      },
    })
  } catch (err) {
    logError(err)
  }
}

export async function preSignUrls(input) {
  try {
    return client.mutate({
      mutation: PRE_SING_URLS_MUTATION,
      variables: {
        input,
      },
    })
  } catch (err) {
    logError(err)
  }
}

export async function getCurrentUser() {
  try {
    return client.query({ query: CURRENT_USER_QUERY })
  } catch (err) {
    logError(err)
  }
}
