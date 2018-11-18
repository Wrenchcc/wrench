import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import Tokens from './Tokens'

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public username: string

  @CreateDateColumn()
  public createdDate: Date

  @UpdateDateColumn()
  public updatedDate: Date

  @Column()
  public firstName: string

  @Column()
  public lastName: string

  @Column()
  public fullName: string

  @Column({ nullable: true })
  public avatarUrl: string

  @Column({ default: false })
  public isAdmin: boolean

  @Column({ default: false })
  public isPro: boolean

  @Column({ nullable: true })
  public dynamicLink: string

  @Column({ nullable: true })
  public facebookId: string

  // @OneToOne(type => Tokens)
  // @JoinColumn()
  // public tokens: Tokens
}
