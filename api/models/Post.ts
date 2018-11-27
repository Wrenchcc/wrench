import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import User from './User'

enum PostType {
  Image = 'image',
  Video = 'video',
}

@Entity('post')
export default class Post extends BaseEntity {
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
