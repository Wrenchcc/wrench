import { createContext } from 'react'
import type { ScrollContextType, ViewabilityItemContextType } from './types'

// @ts-ignore
export const ScrollContext = createContext<ScrollContextType>({
  scrollHandler: () => null,
})

// @ts-ignore
export const ViewabilityItemsContext = createContext<ViewabilityItemContextType>()
