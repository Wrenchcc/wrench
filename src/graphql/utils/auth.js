import { addCurrentUserMutation } from 'graphql/mutations/user'
import { setItem, getItem, removeItem } from 'utils/storage'

const STORAGE_KEY = '@wrench:user'

export const saveUser = data => setItem(STORAGE_KEY, data)

export const getUser = () => getItem(STORAGE_KEY)

export const removeUser = () => removeItem(STORAGE_KEY)

export const rehydrateUser = async client => {
  const user = await getUser()

  await client.mutate({
    mutation: addCurrentUserMutation,
    variables: { data: user },
  })
}
