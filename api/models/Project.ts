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
import generateSlug from 'api/utils/generateSlug'
import User from './User'
import Post from './Post'
import ProjectType from './ProjectType'
import Model from './Model'
import File from './File'

// Generate dynamicLink
@Entity('projects')
export default class Project extends BaseEntity {
  public static async createProject(data) {
    let project
    let times = 0

    while (times < 100) {
      try {
        project = await Project.save({
          ...data,
          slug: times ? generateSlug(`${data.title}-${times}`) : generateSlug(data.title),
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

  public static async getCountByUserId(userId) {
    return Project.getRepository()
      .createQueryBuilder('projects')
      .select(`DISTINCT(${userId})`)
      .getCount()
  }

  @ManyToOne(() => User, user => user.projects)
  public user: User

  @ManyToOne(() => ProjectType, projectType => projectType)
  public projectType: ProjectType

  @OneToMany(() => Post, post => post.project)
  public posts: Post[]

  @OneToMany(() => File, file => file.project)
  public files: File[]

  @ManyToOne(() => Model, model => model)
  public model: Model

  @PrimaryGeneratedColumn('uuid')
  private id: string

  @Column()
  private userId: number

  @Column()
  private projectTypeId: string

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column()
  private title: string

  @Column({ unique: true, nullable: true })
  private slug: string

  @Column({ unique: true, nullable: true })
  private dynamicLink: string
}
