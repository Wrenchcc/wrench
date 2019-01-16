export const MENTION_REGEX = /\/?\B@[a-z0-9.-]+/gi
export const URL_REGEX = /^(?:https?:\/\/)?(?:www\.)?/i

export function extractMentionedUsers(text) {
  const users = text.match(MENTION_REGEX)

  if (users) {
    return users.map(user => user.replace('@', ''))
  }

  return null
}
