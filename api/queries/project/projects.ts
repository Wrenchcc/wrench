import { PROJECT_SORT_TYPES } from 'shared/utils/enums'
import paginate from 'api/utils/paginate'

// TODO: User dataloader
export default async (_, args, ctx) => {
  if (args.type === PROJECT_SORT_TYPES.POPULAR) {
    // TODO: Get popular projects from last week based on followers and comments
  }

  if (args.type === PROJECT_SORT_TYPES.RECENT) {
    // TODO: Get projects most recent with one or more posts
  }

  try {
    return paginate(ctx.db.Project, args)
  } catch (err) {
    console.log(err)
  }
}
