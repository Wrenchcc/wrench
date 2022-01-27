import { createContext } from 'react'
import Animated from 'react-native-reanimated'

export type ViewabilityItemsContextType = string[]

export const ViewabilityItemsContext = createContext<
  Animated.SharedValue<ViewabilityItemsContextType>
>({
  value: [],
})

export const ItemKeyContext = createContext<string | undefined>(undefined)
