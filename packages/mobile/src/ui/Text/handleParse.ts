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
  link: {
    color: COLORS.DARK,
    fontFamily: FONTS.MEDIUM,
  },
  username: {
    color: COLORS.DARK,
  },
  emoji: {
    fontFamily: 'System',
  },
}

// Patterns
// NOTE: Order matters
export default [
  {
    pattern: /\/?\B@[a-z0-9.-]+/gi,
    style: styles.username,
    onPress: handleNamePress,
    renderText: username => username,
  },
  {
    type: 'url',
    style: styles.link,
    onPress: handleUrlPress,
    renderText: matchingString => {
      const pattern = /^(?:https?:\/\/)?(?:www\.)?/i
      return matchingString.replace(pattern, '')
    },
  },
  {
    type: 'emoji',
    style: styles.emoji,
  },
]
