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

@Entity('auth_tokens')
export default class AuthTokens extends BaseEntity {
  @ManyToOne(() => User, user => user.authTokens)
  public user: User

  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public refreshToken: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column('enum', { enum: PlatformType })
  public platform: PlatformType

  @Column()
  public userId: string
}
