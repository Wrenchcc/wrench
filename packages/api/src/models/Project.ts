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
          slug: times ? slugify(`${data.title}-${times}`, '-') : slugify(data.title, '-'),
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
    return Project.query(
      `
      SELECT * from PROJECTS LIMIT 50
    `
    )
  }

  public static async projectCount(userId) {
    return Project.createQueryBuilder('projects')
      .select('COUNT(projects.id)', 'count')
      .where('projects.userId = :userId', {
        userId,
      })
      .getRawOne()
  }

  @ManyToOne(() => User, (user) => user.projects)
  public user: User

  @ManyToOne(() => ProjectType, (projectType) => projectType)
  public projectType: ProjectType

  @OneToMany(() => Post, (post) => post.project)
  public posts: Post[]

  @OneToMany(() => File, (file) => file.project, { onDelete: 'CASCADE' })
  public files: File[]

  @OneToMany(() => Following, (following) => following.project, { onDelete: 'CASCADE' })
  public followers: Following[]

  @ManyToOne(() => Model, (model) => model)
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
