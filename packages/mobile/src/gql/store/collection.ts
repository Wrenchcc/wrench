import { makeVar } from '@apollo/client'

export const collectionVar = makeVar('')

export const toggleCollection = (id) => {
  const selectedId = collectionVar()
  collectionVar(id === selectedId ? '' : id)
}
