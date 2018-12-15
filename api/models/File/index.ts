import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import User from '../User'
import Post from '../Post'
import Project from '../Project'

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
  public id: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @Column({ unique: true })
  public filename: string

  @Column('enum', { enum: FileType })
  public type: FileType

  @Column({ nullable: true })
  public postId: string

  @Column({ nullable: true })
  public userId: string

  @Column({ nullable: true })
  public projectId: string
}
