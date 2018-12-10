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

enum PlatformType {
  Mobile = 'mobile',
  Web = 'web',
}

@Entity('auth_tokens')
export default class AuthTokens extends BaseEntity {
  @ManyToOne(() => User, user => user.authToken)
  public user: User

  @PrimaryGeneratedColumn()
  private id: number

  @Column()
  private refreshToken: string

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column('enum', { enum: PlatformType })
  private platform: PlatformType
}
