import React, { useState, useCallback, useEffect, useRef } from 'react'
import { BackHandler } from 'react-native'
import { Navigation } from 'react-native-navigation'
import Animated from 'react-native-reanimated'
import { isAndroid as _isAndroid } from 'utils/platform'
import { FlatList, SCREENS, currentComponentName } from 'navigation'
import Header from 'navigation/Layout/Header'
import { getRecentPosts } from 'graphql/queries/getExplore'
import Add from 'components/Add'
import SearchBar from 'components/SearchBar'
import Search from 'components/Search'
import Post from 'components/Post'
import ProjectTypes from 'components/ProjectTypes'
import Popular from 'features/explore/components/Popular'

const {
  add,
  and,
  block,
  Clock,
  clockRunning,
  cond,
  diff,
  eq,
  event,
  greaterOrEq,
  greaterThan,
  max,
  min,
  multiply,
  neq,
  or,
  set,
  spring,
  startClock,
  stopClock,
  sub,
  Value,
  interpolate,
} = Animated

const HEADER_HEIGHT = 50
const INITIAL_SCROLL_OFFSET = -180

const renderItem = ({ item }) => <Post post={item.node} />

const DEFAULT_QUERY = ''

function Explore({ posts, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const scrollY = useRef(new Value(0))
  const clock = useRef(new Clock())
  const scrollYClamped = useRef(new Value(0))
  const scrollYDiff = useRef(new Value(0))
  const dragging = useRef(new Value(0))
  const translateY = useRef(new Value(0))
  const endDragVelocity = useRef(new Value(0))
  const translateYSnap = useRef(new Value(0))
  const isAndroid = useRef(new Value(_isAndroid ? 1 : 0))

  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [searchActive, setSearchActive] = useState(false)

  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  }

  const config = {
    damping: 1,
    mass: 1,
    stiffness: 50,
    overshootClamping: true,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0),
  }

  const snapOffset = cond(
    eq(dragging.current, 0),
    cond(
      or(
        eq(isAndroid.current, 0),
        and(neq(translateY.current, INITIAL_SCROLL_OFFSET), neq(translateY.current, -HEADER_HEIGHT))
      ),
      block([
        cond(clockRunning(clock.current), 0, [
          set(state.finished, 0),
          set(state.velocity, endDragVelocity.current),
          set(state.position, 0),
          set(
            translateYSnap.current,
            cond(greaterOrEq(translateY.current, HEADER_HEIGHT / -2), 0, -HEADER_HEIGHT)
          ),
          set(
            config.toValue,
            cond(
              greaterThan(scrollY.current, INITIAL_SCROLL_OFFSET + HEADER_HEIGHT),
              sub(translateYSnap.current, translateY.current),
              multiply(-1, translateY.current)
            )
          ),
          startClock(clock.current),
        ]),
        spring(clock.current, state, config),
        cond(state.finished, [
          set(translateY.current, add(translateY.current, state.position)),
          stopClock(clock.current),
        ]),
        state.position,
      ])
    ),
    stopClock(clock.current)
  )

  const finalTranslateY = add(translateY.current, snapOffset)

  const handleRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  const handleQueryChange = useCallback(
    text => {
      setQuery(text)
    },
    [setQuery]
  )

  const handleSearchCancel = useCallback(() => {
    setQuery(DEFAULT_QUERY)
    setSearchActive(false)
  }, [])

  const handleSearchFocus = useCallback(() => setSearchActive(true), [setSearchActive])
  const handleSearchClear = useCallback(() => setQuery(DEFAULT_QUERY), [setQuery])

  // Close on duble tap
  useEffect(() => {
    const bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(
      ({ selectedTabIndex, unselectedTabIndex }) => {
        if (selectedTabIndex === unselectedTabIndex && currentComponentName === SCREENS.EXPLORE) {
          setQuery(DEFAULT_QUERY)
          setSearchActive(false)
        }
      }
    )

    return () => bottomTabEventListener.remove()
  }, [])

  // Close on android hardware button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (searchActive) {
        setQuery(DEFAULT_QUERY)
        setSearchActive(false)

        return true
      }

      return false
    })

    return () => backHandler.remove()
  }, [searchActive])

  const handleScroll = event(
    [
      {
        nativeEvent: ({ contentOffset }) =>
          block([
            set(scrollY.current, contentOffset.y),
            set(scrollYClamped.current, max(INITIAL_SCROLL_OFFSET, contentOffset.y)),
            set(scrollYDiff.current, diff(scrollYClamped.current)),
            cond(
              neq(dragging.current, 0),
              [
                set(
                  translateY.current,
                  min(0, max(-HEADER_HEIGHT, sub(translateY.current, scrollYDiff.current)))
                ),
                translateY.current,
              ],
              0
            ),
          ]),
      },
    ],
    { useNativeDriver: true }
  )

  const onScrollBeginDrag = () => dragging.current.setValue(1)
  const onScrollEndDrag = () => dragging.current.setValue(0)

  return (
    <>
      <Search query={query} active={searchActive} />

      <Animated.View
        style={{
          zIndex: 100000,
          transform: [
            {
              translateY: interpolate(finalTranslateY, {
                inputRange: [-HEADER_HEIGHT, 0],
                outputRange: [-HEADER_HEIGHT, 0],
              }),
            },
          ],
        }}
      >
        <Header
          style={{
            opacity: interpolate(translateY.current, {
              inputRange: [-HEADER_HEIGHT, 0],
              outputRange: [0, 1],
            }),
          }}
          headerLeft={
            <SearchBar
              onChangeQuery={handleQueryChange}
              query={query}
              onSearchFocus={handleSearchFocus}
              onSearchCancel={handleSearchCancel}
              onSearchClear={handleSearchClear}
              searchActive={searchActive}
            />
          }
          headerRight={searchActive || <Add />}
          stickyComponent={!searchActive && <ProjectTypes />}
        />
      </Animated.View>

      <FlatList
        scrollEventThrottle={1}
        onScroll={handleScroll}
        onScrollEndDrag={onScrollEndDrag}
        onScrollBeginDrag={onScrollBeginDrag}
        extraContentInset={50}
        tabIndex={1}
        spacingSeparator
        initialNumToRender={2}
        ListHeaderComponent={<Popular />}
        data={posts}
        refetch={handleRefetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </>
  )
}

export default getRecentPosts(Explore)
