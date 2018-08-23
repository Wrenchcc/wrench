import { navigateToWebView, navigateToProfile } from 'navigation/actions'
import { COLORS, FONTS } from 'ui/constants'

// Actions
const handleUrlPress = url => navigateToWebView({ url })
const handleNamePress = username => console.log('here') || navigateToProfile({ slug: username })

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
    pattern: /\/?\B@[a-z0-9_-]+/gi,
    style: styles.link,
    onPress: handleNamePress,
    renderText: username => username,
  },
]
