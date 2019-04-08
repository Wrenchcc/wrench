import { FlatList } from 'react-native'
import Animated from 'react-native-reanimated'
import createNavigationAwareScrollable from './createNavigationAwareScrollable'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
export default createNavigationAwareScrollable(AnimatedFlatList)
