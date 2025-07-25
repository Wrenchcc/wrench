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
import { VehicleTypes } from './enums'

@Entity('models')
export default class Model extends BaseEntity {
  @ManyToOne(() => Brand, (brand) => brand.models)
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

  @Column('enum', { enum: VehicleTypes, default: VehicleTypes.MOTORCYCLE })
  public type: VehicleTypes
}
