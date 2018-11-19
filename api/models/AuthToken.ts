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

@Entity()
export default class AuthToken extends BaseEntity {
  @ManyToOne(type => User, user => user.authTokens)
  public user: User

  @PrimaryGeneratedColumn()
  private id: number

  @Column()
  private refreshToken: string

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date
}
