import type { RefObject } from 'react'
import type { ScrollView } from 'react-native-gesture-handler'
import type Animated from 'react-native-reanimated'

export type ScrollContextType = {
  scrollY: Animated.SharedValue<number>
  headerY: Animated.SharedValue<number>
  scrollHandler: () => {}
  scrollTo: () => {}
  scrollRef: RefObject<ScrollView>
}

export type ViewabilityItemContextType = {
  visibleItemId: Animated.SharedValue<string>
  visiblePostId: Animated.SharedValue<string>
  setVisibleItemId: (item: any) => {}
  setVisibleIndex: (id: string, index: number) => {}
}
