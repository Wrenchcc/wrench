import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
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
    return Project.createQueryBuilder('projects')
      .select('count(projects.id)', 'count')
      .addSelect('projects.id', 'id')
      .innerJoin('projects.followers', 'followers')
      .where(`"followers"."createdAt" > NOW()::timestamp - interval '180 day'`) // eslint-disable-line
      .groupBy('projects.id')
      .orderBy('count', 'DESC')
      .getRawMany()

    // return Project.query(`
    //   SELECT *
    //   FROM projects p
    //   LEFT JOIN
    //   (SELECT "projectId",
    //           count("projectId") AS f_count
    //    FROM following
    //    GROUP BY "projectId") f ON ("f"."projectId" = "p"."id")
    //   LEFT JOIN
    //   (SELECT "posts"."projectId",
    //           count("posts"."id") AS p_count
    //    FROM posts
    //    GROUP BY "posts"."projectId") pp ON ("pp"."projectId" = "p"."id")
    //   LEFT JOIN
    //   (SELECT "createdAt" AS f_date
    //    FROM following
    //   GROUP BY "createdAt") f2 ON ("f"."projectId" = "p"."id")
    //   WHERE "f_count" IS NOT NULL
    //   AND "p_count" IS NOT NULL
    //   AND "f_date" > NOW()::TIMESTAMP - interval '30 day'
    //   ORDER BY "f_count" DESC
    // `)
  }

  public static async projectCount(userId) {
    return Project.createQueryBuilder('projects')
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

  @Column({ nullable: true })
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
