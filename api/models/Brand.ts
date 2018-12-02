import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import Model from './Model'

@Entity('brands')
export default class Brands extends BaseEntity {
  @OneToMany(() => Model, model => model.brand)
  public models: Model[]

  @PrimaryGeneratedColumn()
  private id: number

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column()
  private name: string
}
