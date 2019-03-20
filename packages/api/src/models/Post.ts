import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  getRepository,
} from 'typeorm'
import User from './User'
import Project from './Project'
import Comment from './Comment'
import File from './File'

@Entity('posts')
export default class Post extends BaseEntity {
  public static async userPreviousPublished(interval, userId) {
    return getRepository(Post)
      .createQueryBuilder('post')
      .select('count(post.id)', 'count')
      .where(
        `post.createdAt > current_date - interval '${interval}' AND post.userId = '${userId}'` // eslint-disable-line
      )
      .getRawOne()
  }

  @ManyToOne(() => User, user => user.posts)
  public user: User

  @ManyToOne(() => Project, project => project.posts, { onDelete: 'CASCADE' })
  public project: Project

  @OneToMany(() => File, file => file.post)
  public files: File[]

  @OneToMany(() => Comment, comment => comment.post)
  public comments: Comment[]

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public projectId: string

  @Column()
  public userId: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column('text', { nullable: true })
  public caption: string
}
