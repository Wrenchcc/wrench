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
export default class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public createdDate: Date

  @UpdateDateColumn()
  public updatedDate: Date

  @Column()
  public token: string

  @Column()
  public refreshToken: string

  @ManyToOne(type => User, user => user.tokens)
  user: User
}
