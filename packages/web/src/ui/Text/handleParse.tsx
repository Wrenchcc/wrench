import Link from 'next/link'
import { FONTS } from '../constants'

const styles = {
  link: {
    cursor: 'pointer',
  },
  username: {
    fontFamily: FONTS.BOLD,
  },
}

// Patterns
export default [
  {
    type: 'url',
    style: styles.link,
    renderText: (url) => {
      const pattern = /^(?:https?:\/\/)?(?:www\.)?/i
      return (
        <a href={url} rel="nofollow" className="link">
          {url.replace(pattern, '')}
        </a>
      )
    },
  },
  {
    pattern: /\/?\B@[a-z0-9.-]+/gi,
    style: styles.link,
    renderText: (mention) => {
      const username = mention.replace('@', '')
      return (
        <Link href={`/${username}`}>
          <a className="mention">{mention}</a>
        </Link>
      )
    },
  },
]
