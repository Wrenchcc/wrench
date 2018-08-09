import { pathOr } from 'ramda'

export const getProjectId = pathOr(null, ['state', 'params', 'project', 'id'])
export const getPostId = pathOr(null, ['state', 'params', 'id'])
export const getUserId = pathOr(null, ['state', 'params', 'user', 'id'])
