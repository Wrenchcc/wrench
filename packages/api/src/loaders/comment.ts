import DataLoader from 'dataloader'
import Comment from '../models/Comment'

export const createCommentLoader = () =>
  new DataLoader(async (keys: string[]) => {
    const comments = await Comment.findByIds(keys)

    const commentMap: { [key: string]: Comment } = {}

    comments.forEach(c => {
      commentMap[c.id] = c
    })

    return keys.map(k => commentMap[k])
  })
