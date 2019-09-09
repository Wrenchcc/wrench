export default (locale, params) => {
  switch (locale) {
    case 'sv':
    case 'sv-SE':
      return {
        COMMENT_UPDATES: `${params.name} also commented on ${params.owner} post."`,
        NEW_COMMENT_LIKE: `${params.name} gav en gnista på din kommentar.`,
        NEW_COMMENT: `${params.name} kommenterade: ${params.comment} på ditt inlägg.`,
        NEW_FOLLOWER: `${params.name} följer nu ditt projekt: ${params.project} .`,
        NEW_MENTION: `${params.name} nämnde dig i en kommentar: ${params.comment} .`,
        NEW_POST_LIKE: `${params.name} gav en gnista på ditt inlägg.`,
        NEW_REPLY: `${params.name} svarade på din kommentar: ${params.comment} .`,
      }
    default:
      return {
        COMMENT_UPDATES: `${params.name} also commented on ${params.owner} post."`,
        NEW_COMMENT_LIKE: `${params.name} sparked your comment.`,
        NEW_COMMENT: `${params.name} commented: ${params.comment} on your post.`,
        NEW_FOLLOWER: `${params.name} started following your project: ${params.project}.`,
        NEW_MENTION: `${params.name} mentioned you in a comment: ${params.comment}.`,
        NEW_POST_LIKE: `${params.name} sparked your post.`,
        NEW_REPLY: `${params.name} replied to your comment: ${params.comment}.`,
      }
  }
}
