import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import Brand from './Brand'

@Entity('models')
export default class Model extends BaseEntity {
  @ManyToOne(
    () => Brand,
    brand => brand.models
  )
  public brand: Brand

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column()
  public name: string

  @Column()
  public year: number

  @Column()
  public brandId: string
}
