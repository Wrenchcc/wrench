import { pathOr } from 'ramda'

export const getProjectId = pathOr(null, ['state', 'params', 'project', 'id'])
export const getPostId = pathOr(null, ['state', 'params', 'id'])
export const getUserId = pathOr(null, ['state', 'params', 'user', 'id'])

export const getUsername = pathOr(null, ['state', 'params', 'user', 'username'])
export const getProjectSlug = pathOr(null, ['state', 'params', 'project', 'slug'])

export const getUsernameFromDeeplink = pathOr(null, ['state', 'params', 'username'])
export const getProjectSlugFromDeeplink = pathOr(null, ['state', 'params', 'slug'])
export const getPostIdFromDeeplink = pathOr(null, ['state', 'params', 'postId'])
