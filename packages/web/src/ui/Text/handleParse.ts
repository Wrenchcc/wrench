import Router from 'next/router'
import { COLORS, FONTS } from '../constants'

const handleUrlPress = url => console.log(url)
const handleNamePress = name => Router.push(
  {
    pathname: '/user',
    query: { username: 'pontus.abrahamsson' },
  },
  '/pontus.abrahamsson'
)

const styles = {
  link: {
    color: COLORS.DARK,
    cursor: 'pointer',
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
