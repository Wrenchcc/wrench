import { ScrollView } from 'react-native'
import Animated from 'react-native-reanimated'
import createNavigationAwareScrollable from './createNavigationAwareScrollable'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
export default createNavigationAwareScrollable(AnimatedScrollView)
