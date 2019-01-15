export const MENTION_REGEX = /\/?\B@[a-z0-9.-]+/gi
export const URL_REGEX = /^(?:https?:\/\/)?(?:www\.)?/i

export function extractMentionedUsers(text) {
  return text.match(MENTION_REGEX).replace('@', '')
}
