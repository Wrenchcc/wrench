import { path } from 'ramda'
// import { captureException } from 'traits/sentry'

export const scrollToOffset = (node, offset, animated = false) => {
  try {
    if (!node) {
      return null
    }
    if (node.scrollTo) {
      node.scrollTo({ y: offset, animated })
    } else if (node.scrollToOffset) {
      node.scrollToOffset({ offset, animated })
    } else if (path(node, ['_wrapperListRef', '_listRef', 'scrollToOffset'])) {
      node._wrapperListRef._listRef.scrollToOffset({ offset, animated })
    } else {
      console.warn('Missing scrollToOffset in Scrollables/utils')
    }
  } catch (error) {
    // captureException(new Error('Failed to scrollToOffset Scrollables/utils'), {
    //   level: 'warning',
    //   extra: error.errors,
    // })
  }
}

export const getAnimatedScrollableNode = ref => {
  if (!ref) {
    return null
  }
  if (ref.getNode) {
    return ref.getNode()
  }
  if (ref.getScrollResponder) {
    return ref.getScrollResponder()
  }
  if (ref.component) {
    return ref.component
  }

  return ref
}
