import { COLORS, FONTS } from 'ui/constants'
import { navigateTo, showModal, SCREENS } from 'navigation'

function addhttp(url) {
  if (!/^(f|ht)tps?:\/\//i.test(url)) {
    url = `http://${url}`
  }
  return url
}

const handleUrlPress = url => {
  showModal(SCREENS.WEBVIEW, {
    url: addhttp(url),
  })
}

const handleNamePress = name => {
  const username = name.replace('@', '')
  navigateTo(SCREENS.USER, {
    username,
  })
}

const styles = {
  emoji: {
    fontFamily: 'System',
  },
  link: {
    color: COLORS.DARK,
    fontFamily: FONTS.MEDIUM,
  },
  username: {
    color: COLORS.DARK,
  },
}

// Patterns
// NOTE: Order matters
export default [
  {
    onPress: handleNamePress,
    pattern: /\/?\B@[a-z0-9.-]+/gi,
    renderText: username => username,
    style: styles.username,
  },
  {
    onPress: handleUrlPress,
    renderText: matchingString => {
      const pattern = /^(?:https?:\/\/)?(?:www\.)?/i
      return matchingString.replace(pattern, '')
    },
    style: styles.link,
    type: 'url',
  },
  {
    style: styles.emoji,
    type: 'emoji',
  },
]
