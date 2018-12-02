import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import User from './User'
import Project from './Project'
import Comment from './Comment'
import File from './File'

@Entity('posts')
export default class Post extends BaseEntity {
  @ManyToOne(() => User, user => user.posts)
  public user: User

  @ManyToOne(() => Project, project => project.posts)
  public project: Project

  @OneToMany(() => File, file => file.post)
  public files: File[]

  @OneToMany(() => Comment, comment => comment.post)
  public comments: Comment[]

  @PrimaryGeneratedColumn('uuid')
  private id: string

  @Column({ nullable: true })
  private projectId: number

  @Column({ nullable: true })
  private userId: number

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column('text')
  private caption: string
}
