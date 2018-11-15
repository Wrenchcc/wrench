import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public username: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @Column()
  public firstName: string

  @Column()
  public lastName: string

  @Column()
  public fullName: string

  @Column({ nullable: true })
  public avatarUrl: string

  // @Column('int')
  // public projectCount: number

  @Column({ default: false })
  public isAdmin: boolean

  @Column({ default: false })
  public isPro: boolean

  @Column({ nullable: true })
  public dynamicLink: string

  @Column({ nullable: true })
  public accessToken: string

  @Column({ nullable: true })
  public refreshToken: string

  @Column({ nullable: true })
  public facebookToken: string
}
