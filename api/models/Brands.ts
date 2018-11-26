import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import Models from './Models'

@Entity('brands')
export default class Brands extends BaseEntity {
  @OneToMany(type => Models, model => model.brand)
  public models: Models[]

  @PrimaryGeneratedColumn()
  private id: number

  @Column()
  private name: string
}
