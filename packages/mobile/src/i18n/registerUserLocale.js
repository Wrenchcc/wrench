import { pathOr } from 'rambda'
import { client, getCurrentUser } from 'services/gql'
import { EditUserMutation } from 'services/graphql/mutations/user/editUser'
import { logError } from 'utils/analytics'
import { getLocale, timezone } from './helpers'

export function updateUserLocale(locale) {
  try {
    client.mutate({
      mutation: EditUserMutation,
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
        mutation: EditUserMutation,
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
