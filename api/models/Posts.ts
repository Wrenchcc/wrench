import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import Users from './Users'

enum PostType {
  Image = 'image',
  Video = 'video',
}

@Entity('posts')
export default class Posts extends BaseEntity {
  // user
  // project

  @PrimaryGeneratedColumn('uuid')
  private id: string

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column('enum', { enum: PostType })
  private type: PostType

  @Column('text')
  private caption: string
}
