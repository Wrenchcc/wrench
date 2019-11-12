import Link from 'next/link'
import { COLORS, FONTS } from '../constants'

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
    renderText: url => {
      const pattern = /^(?:https?:\/\/)?(?:www\.)?/i
      return (
        <a href={url} rel="nofollow">
          {url.replace(pattern, '')}
        </a>
      )
    },
  },
  {
    pattern: /\/?\B@[a-z0-9.-]+/gi,
    style: styles.link,
    renderText: mention => {
      const username = mention.replace('@', '')
      return (
        <Link
          href={{
            pathname: '/user',
            query: { username },
          }}
          as={{
            pathname: `/${username}`,
          }}
        >
          <a>{mention}</a>
        </Link>
      )
    },
  },
]
