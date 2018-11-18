import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class Tokens {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public userId: number

  @CreateDateColumn()
  public createdDate: Date

  @UpdateDateColumn()
  public updatedDate: Date

  @Column()
  public token: string

  @Column()
  public refreshToken: string
}
