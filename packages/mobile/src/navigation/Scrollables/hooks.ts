import { useContext } from 'react'
import { ScrollContext, ViewabilityItemsContext } from './context'

export const useScrollContext = () => {
  return useContext(ScrollContext)
}

export const useViewability = () => {
  return useContext(ViewabilityItemsContext)
}
