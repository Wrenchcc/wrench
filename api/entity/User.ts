import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public username: string

  // @Column({ type: 'date' })
  // createdAt: date

  // @UpdateDateColumn
  // updatedAt: date

  @Column()
  public firstName: string

  @Column()
  public lastName: string

  @Column
  public fullName: string

  @Column
  public avatarUrl: string

  @Column('int')
  public projectCount: int

  @Column
  public isAdmin: boolean

  @Column
  public isPro: boolean

  @Column
  public dynamicLink: string
}

export default User
