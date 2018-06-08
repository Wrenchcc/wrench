import { navigateToWebView, navigateToProfile } from 'navigation'
import { COLORS, FONTS } from 'ui/constants'

// Actions
const handleUrlPress = url => navigateToWebView({ url })
const handleNamePress = () => navigateToProfile({ user: null })

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
    pattern: /\[(@[^:]+):([^\]]+)\]/i,
    style: styles.link,
    onPress: handleNamePress,
    renderText: matchingString => {
      const pattern = /\[(@[^:]+):([^\]]+)\]/i
      const match = matchingString.match(pattern)
      return match[1]
    },
  },
  {
    pattern: /\[([^:]+):([^\]]+)\]/i,
    style: styles.username,
    onPress: handleNamePress,
    renderText: matchingString => {
      const pattern = /\[([^:]+):([^\]]+)\]/i
      const match = matchingString.match(pattern)
      return match[1]
    },
  },
]
