import paginate from 'api/utils/paginate'

export default async ({ id }, args, ctx) => {
  const blah = await ctx.db.Project.findOne({
    relations: ['followers'],
    // where: { projectIds: id },
  })

  // const blah = await ctx.db.Project.createQueryBuilder('project')
  //   .leftJoinAndSelect('project.followers', 'followers')
  //   .getMany()

  console.log(blah)

  try {
    return {
      totalCount: 1000,
    }
  } catch (err) {
    console.log(err)
  }
}
