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
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public refreshToken: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(type => User, user => user.authTokens)
  user: User
}
