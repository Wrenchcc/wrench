import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import Brands from './Brands'

@Entity('models')
export default class Models extends BaseEntity {
  @OneToOne(type => Brands)
  @JoinColumn()
  public brand: Brands

  @PrimaryGeneratedColumn()
  private id: number

  @Column()
  private model: string

  @Column()
  private year: number
}
