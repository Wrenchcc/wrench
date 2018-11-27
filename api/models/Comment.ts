import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import User from './User'

@Entity('comment')
export default class Comment extends BaseEntity {
  // user
  // post

  @PrimaryGeneratedColumn('uuid')
  private id: string

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column('text')
  private text: string
}
