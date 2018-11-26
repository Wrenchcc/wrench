import paginate from 'api/utils/paginate'
import pageInfo from 'api/fixtures/pageInfo'
import projects from 'api/fixtures/projects'
import users from 'api/fixtures/users'

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
      return paginate(
        ctx.db.Models,
        {
          relations: ['brand'],
          where: { name: args.query },
        },
        args
      )
    }
    default:
      return null
  }
}
