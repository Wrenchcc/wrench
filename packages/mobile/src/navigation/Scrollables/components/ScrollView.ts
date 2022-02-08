import { ScrollView } from 'react-native'
import Animated from 'react-native-reanimated'
import createScrollable from './createScrollable'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
export default createScrollable(AnimatedScrollView)
