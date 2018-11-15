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

  @Column()
  public avatarUrl: string

  @Column('int')
  public projectCount: number

  @Column()
  public isAdmin: boolean

  @Column()
  public isPro: boolean

  @Column()
  public dynamicLink: string
}
