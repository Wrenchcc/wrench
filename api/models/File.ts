import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import User from './User'
import Post from './Post'
import Project from './Project'

enum FileType {
  Image = 'image',
  Video = 'video',
}

@Entity('files')
export default class File extends BaseEntity {
  @ManyToOne(() => User, user => user.files, { onDelete: 'CASCADE' })
  public user: User

  @ManyToOne(() => Post, post => post.files, { onDelete: 'CASCADE' })
  public post: Post

  @ManyToOne(() => Project, project => project.files)
  public project: Project

  @PrimaryGeneratedColumn('uuid')
  private id: string

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column({ unique: true })
  private filename: string

  @Column('enum', { enum: FileType })
  private type: FileType

  @Column({ nullable: true })
  private postId: string

  @Column({ nullable: true })
  private userId: string

  @Column({ nullable: true })
  private projectId: string
}
