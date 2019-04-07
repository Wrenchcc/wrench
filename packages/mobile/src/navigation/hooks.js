import { useContext } from 'react'
import { NavigationContext } from './context'

export function useNavigation() {
  return useContext(NavigationContext)
}
