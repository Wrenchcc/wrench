import { SectionList } from 'react-native'
import Animated from 'react-native-reanimated'
import createScrollable from './createScrollable'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)
export default createScrollable(AnimatedSectionList)
