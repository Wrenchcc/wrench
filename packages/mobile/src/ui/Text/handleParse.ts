import { FONTS } from 'ui/constants'
import { showModal, navigateWithoutContext, SCREENS } from 'navigation'

function addhttp(url) {
  if (!/^(f|ht)tps?:\/\//i.test(url)) {
    url = `http://${url}`
  }
  return url
}

const handleUrlPress = (url) => {
  showModal(SCREENS.WEBVIEW, {
    url: addhttp(url),
  })
}

const handleNamePress = (name) => {
  const username = name.replace('@', '')
  navigateWithoutContext(SCREENS.USER, {
    user: { username },
  })
}

const handleHashtagPress = (hashtag) => {
  const slug = hashtag.replace('#', '')
  navigateWithoutContext(SCREENS.HASHTAG, {
    slug,
  })
}

const styles = {
  bold: {
    fontFamily: FONTS.MEDIUM,
  },
}

// Patterns
// NOTE: Order matters
export default [
  {
    onPress: handleNamePress,
    pattern: /\/?\B@[a-z0-9.-]+/gi,
    renderText: (username) => username,
    style: styles.bold,
  },
  {
    onPress: handleHashtagPress,
    pattern: /#(\w+)/,
    renderText: (hashtag) => hashtag,
    style: styles.bold,
  },
  {
    onPress: handleUrlPress,
    renderText: (matchingString) => {
      const pattern = /^(?:https?:\/\/)?(?:www\.)?/i
      return matchingString.replace(pattern, '')
    },
    style: styles.bold,
    type: 'url',
  },
]
