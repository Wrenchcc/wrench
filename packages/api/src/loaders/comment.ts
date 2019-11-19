import DataLoader from 'dataloader'
import Comment from '../models/Comment'

type BatchComment = (ids: string[]) => Promise<Comment[]>

const batchComments: BatchComment = async ids => {
  const comments = await Comment.findByIds(ids)

  const commentMap: { [key: string]: Comment } = {}

  comments.forEach(u => {
    commentMap[u.id] = u
  })

  return ids.map(id => commentMap[id])
}

export const createCommentLoader = () => new DataLoader<string, Comment>(batchComments)
