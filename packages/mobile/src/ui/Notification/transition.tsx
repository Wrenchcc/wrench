import React from 'react'
import { Transition } from 'react-native-reanimated'

export default (
  <Transition.Sequence>
    <Transition.Change interpolation="easeInOut" durationMs={100} />
    <Transition.In type="fade" durationMs={80} />
  </Transition.Sequence>
)
