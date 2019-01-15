import { pathOr } from 'ramda'

export const getProjectId = pathOr(null, ['state', 'params', 'project', 'id'])
export const getPostId = pathOr(null, ['state', 'params', 'id'])
export const getUserId = pathOr(null, ['state', 'params', 'user', 'id'])

// Support deeplink and navigation params
export const getUsername = pathOr(pathOr(null, ['state', 'params', 'username']), [
  'state',
  'params',
  'user',
  'username',
])

export const getProjectSlug = pathOr(pathOr(null, ['state', 'params', 'slug']), [
  'state',
  'params',
  'project',
  'slug',
])
