import { FlatList } from 'react-native'
import Animated from 'react-native-reanimated'
import createScrollable from './createScrollable'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
export default createScrollable(AnimatedFlatList)
