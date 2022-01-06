import { makeVar } from '@apollo/client'

export const queryVar = makeVar('')
export const activeVar = makeVar(false)

export const setQuery = (query) => queryVar(query)
export const setActive = (flag) => activeVar(flag)
