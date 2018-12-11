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
import { PlatformType } from './enums'

@Entity('device_tokens')
export default class DeviceToken extends BaseEntity {
  @ManyToOne(() => User, user => user.deviceTokens)
  public user: User

  @PrimaryGeneratedColumn()
  private id: number

  @Column()
  private token: string

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column('enum', { enum: PlatformType })
  private platform: PlatformType
}
