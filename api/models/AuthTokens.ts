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
export default class AuthTokens extends BaseEntity {
  @ManyToOne(type => Users, user => user.authTokens)
  public user: Users

  @PrimaryGeneratedColumn()
  private id: number

  @Column()
  private refreshToken: string

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date
}
