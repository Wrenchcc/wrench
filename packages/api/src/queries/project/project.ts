import { ApolloError } from 'apollo-server-express'

// TODO: Use dataloader
export default async (_, args, ctx) => {
  const project = await ctx.db.Project.findOne({
    where: {
      ...args,
    },
  })

  if (!project) {
    return new ApolloError('Project not found')
  }

  return project
}
