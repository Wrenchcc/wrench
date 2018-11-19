import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import Users from './Users'

@Entity()
export default class Notifications extends BaseEntity {
  @ManyToOne(type => Users, user => user.notifications)
  public user: Users

  @PrimaryGeneratedColumn()
  private id: number

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column()
  private type: string

  @Column()
  private value: boolean
}
