export const MENTION_REGEX = /\/?\B@[a-z0-9.-]+/gi
export const URL_REGEX = /^(?:https?:\/\/)?(?:www\.)?/i
export const HASHTAG_RREGEX = /#[A-Za-z0-9]*/g

export function extractMentionedUsers(text) {
  const users = text.match(MENTION_REGEX)

  if (users) {
    return users.map(user => user.replace('@', ''))
  }

  return null
}

export function extractHashtags(text) {
  const hashtags = text.match(HASHTAG_RREGEX)

  if (hashtags) {
    return hashtags.map(tag => tag.replace('#', ''))
  }

  return null
}
