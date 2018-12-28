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
import { createDynamicLink } from 'api/services/firebase'
import User from '../User'
import Post from '../Post'
import ProjectType from '../ProjectType'
import Model from '../Model'
import File from '../File'

// TODO: Check latest created Project with slug
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

    const dynamicLink = await createDynamicLink({ path: `project/${project.slug}` })

    return Project.save({
      ...project,
      dynamicLink,
    })
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
  public id: string

  @Column()
  public userId: string

  @Column()
  public projectTypeId: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @Column()
  public title: string

  @Column({ unique: true, nullable: true })
  public slug: string

  @Column({ unique: true, nullable: true })
  public dynamicLink: string

  @Column({ default: false })
  public isPrivate: boolean

  @Column({ default: false })
  public commentsDisabled: boolean
}
