export default params => ({
  en: {
    NEW_COMMENT: `${params.name} commented: ${params.comment} on your project ${params.project}.`,
    NEW_MENTION: `${params.name} mentioned you in a comment: ${params.comment}.`,
    NEW_REPLY: `${params.name} replied to your comment: ${params.comment}.`,
    NEW_FOLLOWER: `${params.name} started following your project: ${params.project}.`,
  },
  sv: {
    NEW_COMMENT: `${params.name} kommenterade: ${params.comment} på ditt projekt ${
      params.project
    }.`,
    NEW_MENTION: `${params.name} nämnde dig i en kommentar: ${params.comment} .`,
    NEW_REPLY: `${params.name} svarade på din kommentar: ${params.comment} .`,
    NEW_FOLLOWER: `${params.name} följer nu ditt projekt: ${params.project} .`,
  },
})
