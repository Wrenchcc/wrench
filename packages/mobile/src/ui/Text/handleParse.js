import { navigateToWebView, navigateToUser } from 'navigation/actions'
import { COLORS, FONTS } from 'ui/constants'

function addhttp(url) {
  if (!/^(f|ht)tps?:\/\//i.test(url)) {
    url = `http://${url}`
  }
  return url
}

const handleUrlPress = url => navigateToWebView({ url: addhttp(url) })

const handleNamePress = name => {
  const username = name.replace('@', '')
  navigateToUser({ user: { username } })
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
export default [
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
    pattern: /\/?\B@[a-z0-9.-]+/gi,
    style: styles.username,
    onPress: handleNamePress,
    renderText: username => username,
  },
  {
    type: 'emoji',
    style: styles.emoji,
  },
]
