import React, { memo, useRef, cloneElement, useEffect, useCallback } from 'react'
import { Navigation } from 'react-native-navigation'
import Animated from 'react-native-reanimated'
import { NAVIGATION, NAVIGATION_COMPONENTS } from '../constants'
import useComponentId from '../hooks/useComponentId'

const { event, set, Value } = Animated

function Page({
  children,
  stickyFooter,
  scrollToIndex,
  headerTitle,
  headerSubTitle,
  headerRight,
  headerLeft,
  headerAnimation,
  headerTitleFontSize,
  view,
}) {
  const scrollRef = useRef()
  const scrollY = useRef(new Value(-NAVIGATION.LIST_OFFSET))
  const componentId = useComponentId()

  const scrollToTop = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.getNode().scrollToOffset({ offset: -NAVIGATION.LIST_OFFSET })
    }
  }, [scrollRef])

  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          component: {
            name: NAVIGATION_COMPONENTS.HEADER_TITLE,
            passProps: {
              headerTitleFontSize,
              text: headerTitle,
              subtitle: headerSubTitle,
              headerAnimation,
              onPress: scrollToTop,
              // scrollY: scrollY.current,
            },
          },
        },
        leftButtons: headerLeft && [{ id: 'leftButton', headerLeft }],
        rightButtons: headerRight && [{ id: 'rightButton', ...headerRight }],
      },
    })
  }, [headerTitle, headerRight])

  useEffect(() => {
    if (scrollToIndex && scrollRef.current) {
      scrollRef.current.getNode().scrollToOffset({ top: 600 })
    }
  }, [scrollRef, scrollToIndex])

  return view ? (
    children
  ) : (
    <>
      {cloneElement(children, {
        onScroll: event(
          [
            {
              nativeEvent: ({ contentOffset }) => set(scrollY.current, contentOffset.y),
            },
          ],
          { useNativeDriver: true }
        ),
        ref: scrollRef,
      })}

      {stickyFooter}
    </>
  )
}

export default memo(Page)
