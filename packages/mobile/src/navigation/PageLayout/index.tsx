import React, { memo, Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import Animated from 'react-native-reanimated'
import { RefreshControl } from 'react-native'
import Header from './Header'
import styles from './styles'

const OFFSET = 90

const { ScrollView, event, set, Value, cond, eq } = Animated

const scrollY = new Value(-OFFSET)

function PageLayout({ children, title, headerRight, footer }) {
  return (
    <Fragment>
      <Header title={title} scrollY={scrollY} headerRight={headerRight} />
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        contentInset={{
          top: OFFSET,
        }}
        contentOffset={{
          y: -OFFSET,
        }}
        onScroll={event(
          [
            {
              nativeEvent: ({ contentOffset }) => set(scrollY, contentOffset.y),
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={1}
      >
        {children}
      </ScrollView>
      {footer && footer}
    </Fragment>
  )
}

PageLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

export default memo(PageLayout)
