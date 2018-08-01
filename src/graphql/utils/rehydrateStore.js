import { getUser } from 'graphql/utils/auth'
import addCurrentUserMutation from 'graphql/mutations/addCurrentUser.graphql'

export default async client => {
  const user = await getUser()

  await client.mutate({
    mutation: addCurrentUserMutation,
    variables: { data: user },
  })
}
