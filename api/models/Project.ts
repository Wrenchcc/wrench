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
import User from './User'
import Post from './Post'
import ProjectType from './ProjectType'
import File from './File'

@Entity('projects')
export default class Project extends BaseEntity {
  public static async getCountByUserId(userId) {
    return Project.getRepository()
      .createQueryBuilder('projects')
      .select(`DISTINCT(${userId})`)
      .getCount()
  }

  @ManyToOne(() => User, user => user.projects)
  public user: User

  @OneToMany(() => Post, post => post.project)
  public posts: Post[]

  @OneToMany(() => File, file => file.project)
  public files: File[]

  @ManyToOne(() => ProjectType, projectType => projectType)
  public projectType: ProjectType

  @PrimaryGeneratedColumn('uuid')
  private id: string

  @Column({ nullable: true })
  private userId: number

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column()
  private title: string

  @Column({ unique: true })
  private slug: string

  @Column({ unique: true, nullable: true })
  private dynamicLink: string
}
