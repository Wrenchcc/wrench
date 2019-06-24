import { SectionList } from 'react-native'
import Animated from 'react-native-reanimated'
import createNavigationAwareScrollable from './createNavigationAwareScrollable'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)
export default createNavigationAwareScrollable(AnimatedSectionList)
