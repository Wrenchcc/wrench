import { pathOr } from 'rambda'
import { EditUserDocument } from '@wrench/common'
import { client, getCurrentUser } from 'gql'
import { logError } from 'utils/sentry'
import { getLocale, timezone } from './helpers'

export function updateUserLocale(locale) {
  try {
    client.mutate({
      mutation: EditUserDocument,
      variables: {
        input: { locale },
      },
    })
  } catch (err) {
    logError(err)
  }
}

export async function registerUserLocale() {
  const user = await getCurrentUser()

  if (
    !pathOr(false, ['data', 'user', 'settings', 'locale'], user) ||
    !pathOr(false, ['data', 'user', 'settings', 'timezone'], user)
  ) {
    const locale = await getLocale()

    try {
      client.mutate({
        mutation: EditUserDocument,
        variables: {
          input: {
            locale,
            timezone,
          },
        },
      })
    } catch (err) {
      logError(err)
    }
  }
}
