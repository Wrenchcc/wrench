import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import Model from './Model'

@Entity('brands')
export default class Brands extends BaseEntity {
  @OneToMany(type => Model, model => model.brand)
  public models: Model[]

  @PrimaryGeneratedColumn()
  private id: number

  @Column()
  private name: string
}
