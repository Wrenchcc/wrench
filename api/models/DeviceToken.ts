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

@Entity('device_token')
export default class DeviceToken extends BaseEntity {
  @ManyToOne(() => User, user => user.deviceToken)
  public user: User

  @PrimaryGeneratedColumn()
  private id: number

  @Column()
  private deviceToken: string

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date
}
