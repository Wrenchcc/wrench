import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('brands')
export default class Brands extends BaseEntity {
  @PrimaryGeneratedColumn()
  private id: number

  @Column()
  public name: string
}
