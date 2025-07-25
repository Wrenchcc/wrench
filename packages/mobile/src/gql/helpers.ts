import {
  CurrentUserDocument,
  CurrentUserProjectsDocument,
  PreSignUrlsDocument,
  PreSignUrlDocument,
  RegisterDeviceTokenDocument,
  UnreadNotificationsDocument,
} from '@wrench/common'
import { PLATFORM_TYPES } from 'utils/enums'
import { logError } from 'utils/sentry'
import { client } from './client'

export async function registerDeviceToken(token) {
  try {
    return client.mutate({
      mutation: RegisterDeviceTokenDocument,
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
      mutation: PreSignUrlsDocument,
      variables: {
        input,
      },
    })
  } catch (err) {
    logError(err)
  }
}

export async function preSignUrl(input) {
  try {
    return client.mutate({
      mutation: PreSignUrlDocument,
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
    return client.query({ query: CurrentUserDocument })
  } catch (err) {
    logError(err)
  }
}

export async function getUnreadNotifications({ fetchPolicy }) {
  try {
    const response = await client.query({
      query: UnreadNotificationsDocument,
      fetchPolicy,
    })

    return response?.data?.unreadNotifications || 0
  } catch (err) {
    logError(err)
  }
}

export async function getCurrentUserProjects() {
  try {
    return client.query({
      query: CurrentUserProjectsDocument,
      fetchPolicy: 'cache-only',
    })
  } catch (err) {
    logError(err)
  }
}
