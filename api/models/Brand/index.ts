import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import Model from '../Model'

@Entity('brands')
export default class Brands extends BaseEntity {
  @OneToMany(() => Model, model => model.brand)
  public models: Model[]

  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @Column()
  public name: string
}
