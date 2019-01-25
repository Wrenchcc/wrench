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
import { PlatformTypes } from './enums'

@Entity('auth_tokens')
export default class AuthToken extends BaseEntity {
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

  @Column('enum', { enum: PlatformTypes })
  public platform: PlatformTypes

  @Column()
  public userId: string
}
