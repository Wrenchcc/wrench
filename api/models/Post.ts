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
import File from './File'

enum PostType {
  Image = 'image',
  Video = 'video',
}

@Entity('posts')
export default class Post extends BaseEntity {
  // user
  // project

  @OneToMany(() => File, file => file.post)
  public files: File[]

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
