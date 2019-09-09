import { ApolloError } from 'apollo-server-express'
import { ERROR_CODES } from '../../utils/enums'

// TODO: Use dataloader
export default async (_, args, ctx) => {
  const project = await ctx.db.Project.findOne({
    where: {
      ...args,
    },
  })

  if (!project) {
    return new ApolloError('Project not found', ERROR_CODES.NOT_FOUND)
  }

  return project
}
