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
  console.log('katt', hashtags)

  // if (users) {
  //   return users.map(user => user.replace('@', ''))
  // }

  return text
}
