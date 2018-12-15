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
import User from '../User'
import Project from '../Project'
import Comment from '../Comment'
import File from '../File'

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
  public id: string

  @Column()
  public projectId: string

  @Column()
  public userId: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @Column('text', { nullable: true })
  public caption: string
}
