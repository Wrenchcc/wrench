import { useMemo } from 'react'
import Animated, { Easing } from 'react-native-reanimated'

const {
  add,
  and,
  block,
  call,
  Clock,
  clockRunning,
  cond,
  eq,
  interpolateNode,
  set,
  startClock,
  stopClock,
  timing,
  useCode,
  Value,
  not,
  neq,
  Extrapolate,
} = Animated

type TimingConfig = Partial<Omit<Animated.TimingConfig, 'toValue'>> & {
  onAnimationCompleted: (args: readonly 0[]) => void
}

export const useTransition = (state: boolean | number, config: TimingConfig) => {
  const value = useMemo(() => new Value(0), [])
  useCode(() => set(value, typeof state === 'boolean' ? (state ? 1 : 0) : state), [state, value])

  return useMemo(() => {
    const clock = new Clock()
    const counter = new Value(0)
    const state = {
      finished: new Value(0),
      frameTime: new Value(0),
      position: new Value(0),
      time: new Value(0),
    }
    const timingConfig = {
      toValue: new Value(0),
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      ...config,
    }

    return block([
      startClock(clock),
      cond(neq(timingConfig.toValue, value), [
        set(counter, add(counter, 1)),
        set(state.frameTime, 0),
        set(state.time, 0),
        set(state.finished, 0),
        set(timingConfig.toValue, value),
      ]),
      timing(clock, state, timingConfig),
      cond(
        and(neq(counter, 0), eq(state.position, value), clockRunning(clock)),
        block([stopClock(clock), call([state.position], config.onAnimationCompleted)])
      ),
      state.position,
    ])
  }, [value])
}

type SetTimeoutHook = {
  startWhen: Animated.Node<number>
  stopWhen: Animated.Node<number>
  timeout: number
  onTimeoutFinished: (args: readonly number[]) => void
}

export const useSetTimeout = ({
  startWhen,
  stopWhen,
  timeout,
  onTimeoutFinished,
}: SetTimeoutHook) => {
  const timer = useMemo(
    () => ({
      clock: new Clock(),
      start: new Value(0),
    }),
    []
  )

  const ready = interpolateNode(timer.clock, {
    inputRange: [timer.start, add(timer.start, timeout)],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  })

  useCode(
    () =>
      block([
        // Stop timer if we do not need it anymore
        cond(stopWhen, stopClock(timer.clock)),
        // Check if timeout is finished
        cond(and(eq(ready, 1), clockRunning(timer.clock)), [
          call([], onTimeoutFinished),
          stopClock(timer.clock),
        ]),
        // Start timer when animation is finished (the banner is fully visible)
        cond(and(startWhen, not(clockRunning(timer.clock)), neq(timeout, 0)), [
          startClock(timer.clock),
          set(timer.start, timer.clock),
        ]),
      ]),
    [timeout]
  )
}
