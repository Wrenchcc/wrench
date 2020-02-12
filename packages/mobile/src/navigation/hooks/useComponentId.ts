import { useContext } from 'react'
import { NavigationContext } from '../context'

export default function useComponentId() {
  const componentId = useContext(NavigationContext)
  return componentId
}
