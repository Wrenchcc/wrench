import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  getRepository,
} from 'typeorm'
import slugify from '../utils/slugify'
import User from './User'
import Post from './Post'
import ProjectType from './ProjectType'
import Model from './Model'
import File from './File'
import Following from './Following'

@Entity('projects')
export default class Project extends BaseEntity {
  public static async createProject(data) {
    let project
    let times = 0

    while (times < 100) {
      try {
        project = await Project.save({
          ...data,
          slug: times ? slugify(`${data.title}-${times}`) : slugify(data.title),
        })
        break
      } catch (err) {
        if (!err.detail.includes('already exists')) {
          throw err
        }
      }

      times += 1
    }

    return project
  }

  public static async getPopularProjects() {
    // TODO: Change to last 7 days
    // Only when having posts
    // Sort by amount of followers
    return getRepository(Project)
      .createQueryBuilder('projects')
      .select('count(projects.id)', 'count')
      .addSelect('projects.id', 'id')
      .innerJoin('projects.followers', 'followers')
      .where(`"followers"."createdAt" > NOW()::timestamp - interval '30 day'`) // eslint-disable-line
      .groupBy('projects.id')
      .orderBy('count', 'DESC')
      .getRawMany()

    // select *
    // from Projects p
    // left join (
    //   select
    //     project_id,
    //     count(project_id) as count
    //   from Followers
    //   group by project_id
    // ) f on (f.project_id = p.id)
    // order by count desc

    // return getRepository(Project)
    //   .createQueryBuilder('projects')
    //   .select('"projects"."id"')
    //   .addSelect('count') // we get this in the subquery
    //   .innerJoin(
    //     query => query
    //       .select('"following"."createdAt"')
    //       .addSelect('count("following"."createdAt")', 'count')
    //       .from(Following, null)
    //         .where(`"following"."createdAt" > current_date - interval '30 day'`) // eslint-disable-line
    //       .groupBy('"following"."createdAt"'),
    //     'f',
    //     '"f"."projectId" = p.id'
    //   )
    //   .orderBy('count', 'DESC')
    //   .getMany()
  }

  public static async projectCount(userId) {
    return getRepository(Project)
      .createQueryBuilder('projects')
      .select('COUNT(projects.id)', 'count')
      .where('projects.userId = :userId', {
        userId,
      })
      .getRawOne()
  }

  @ManyToOne(() => User, user => user.projects)
  public user: User

  @ManyToOne(() => ProjectType, projectType => projectType)
  public projectType: ProjectType

  @OneToMany(() => Post, post => post.project)
  public posts: Post[]

  @OneToMany(() => File, file => file.project, { onDelete: 'CASCADE' })
  public files: File[]

  @OneToMany(() => Following, following => following.project, { onDelete: 'CASCADE' })
  public followers: Following[]

  @ManyToOne(() => Model, model => model)
  public model: Model

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public userId: string

  @Column()
  public projectTypeId: string

  @Column()
  public modelId: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column()
  public title: string

  @Column({ unique: true, nullable: true })
  public slug: string

  @Column({ default: false })
  public commentsDisabled: boolean
}
