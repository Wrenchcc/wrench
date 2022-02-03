import { createContext } from 'react'

export type ViewabilityItemsContextType = string[]

export const ViewabilityItemsContext = createContext({
  visibleItemId: {
    value: [],
  },
  visiblePostId: {
    value: [],
  },
  setVisibleItemId: (item: any) => {},
  setVisibleIndex: (id: string, index: number) => {},
})
