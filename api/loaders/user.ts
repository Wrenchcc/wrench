import createLoader from './createLoader'

function getUsers(users) {
  return null
}

export const createUserLoader = createLoader(getUsers, 'id')

export default () => {
  throw new Error(
    '⚠️ Do not import loaders directly, get them from the GraphQL context instead! ⚠️'
  )
}
