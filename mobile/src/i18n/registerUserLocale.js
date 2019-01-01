import { pathOr } from 'ramda'
import { client } from 'graphql/createClient'
import { EditUserMutation } from 'graphql/mutations/user/editUser'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import { logError } from 'utils/analytics'
import { getLocale } from './helpers'

export function registerUserLocale(locale) {
  try {
    client.mutate({
      mutation: EditUserMutation,
      variables: { input: { locale } },
    })
  } catch (err) {
    logError(err)
  }
}

export async function registerRemoteUserLocale() {
  const user = await client.query({ query: CurrentUserQuery })

  if (!pathOr(false, ['data', 'user', 'settings', 'locale'], user)) {
    const locale = await getLocale()

    try {
      client.mutate({
        mutation: EditUserMutation,
        variables: { input: { locale } },
      })
    } catch (err) {
      logError(err)
    }
  }
}
