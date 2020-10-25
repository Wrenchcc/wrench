import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import User from './User'
import Comment from './Comment'
import File from './File'

@Entity('blog_posts')
export default class BlogPost extends BaseEntity {
  @ManyToOne(
    () => User,
    user => user.posts
  )
  public user: User

  @OneToMany(
    () => File,
    file => file.post
  )
  public files: File[]

  @OneToMany(
    () => Comment,
    comment => comment.post
  )
  public comments: Comment[]

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public userId: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column('text', { nullable: true })
  public content: string
}
