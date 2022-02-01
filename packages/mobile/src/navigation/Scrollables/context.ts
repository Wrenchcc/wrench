import { createContext } from 'react'

export type ViewabilityItemsContextType = string[]

export const ViewabilityItemsContext = createContext({
  visibleItemId: null,
  setVisibleItemId: (item: any) => {},
  setVisibleIndex: (id: string, index: number) => {},
})
