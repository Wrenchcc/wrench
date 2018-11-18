import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export default class Tokens extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public userId: string

  @CreateDateColumn()
  public createdDate: Date

  @UpdateDateColumn()
  public updatedDate: Date

  @Column()
  public token: string

  @Column()
  public refreshToken: string
}
