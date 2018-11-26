import paginate from 'api/utils/paginate'
import pageInfo from 'api/fixtures/pageInfo'
import projects from 'api/fixtures/projects'
import users from 'api/fixtures/users'
import models from 'api/fixtures/models'
import Models from 'api/models/Models'
import { getRepository } from 'typeorm'

export default async (_, args, ctx) => {
  switch (args.type) {
    case 'USERS':
      return {
        edges: users(),
        pageInfo,
      }
    case 'PROJECTS':
      return {
        edges: projects(),
        pageInfo,
      }
    case 'MODELS': {
      const modelsAccessor = await ctx.db.Models.find({
        where: { name: args.query },
      })

      const result = await paginate(modelsAccessor, args, { orderColumn: 'id', ascOrDesc: 'asc' })
      return {
        pageInfo,
        edges: models(),
      }
    }
    default:
      return null
  }
}
