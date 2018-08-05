import { pathOr } from 'ramda'

export const getProjectId = pathOr(null, ['state', 'params', 'project', 'id'])
export const getUserId = pathOr(null, ['state', 'params', 'user', 'id'])
