import React from 'react'
import { NavigationContext } from './context'

export function useNavigation() {
  return <NavigationContext.Consumer>{({ componentId }) => null})}</NavigationContext.Consumer>
}
