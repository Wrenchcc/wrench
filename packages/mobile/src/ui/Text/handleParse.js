import { navigateToWebView, navigateToUser } from 'navigation/actions'
import { COLORS, FONTS } from 'ui/constants'

const handleUrlPress = url => navigateToWebView({ url })

const handleNamePress = name => {
  const username = name.replace('@', '')
  navigateToUser({ user: { username } })
}

const styles = {
  link: {
    color: COLORS.DARK,
  },
  username: {
    color: COLORS.DARK,
    fontFamily: FONTS.BOLD,
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
    style: styles.link,
    onPress: handleNamePress,
    renderText: username => username,
  },
]
