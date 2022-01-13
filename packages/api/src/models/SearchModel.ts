import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'
import { VehicleTypes } from './enums'

@Entity('search_models')
export default class SearchModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Index({ fulltext: true })
  @Column()
  public query: string

  @Column()
  public brand: string

  @Column()
  public brandId: string

  @Column()
  public model: string

  @Column()
  public modelId: string

  @Column()
  public year: number

  @Column('enum', { enum: VehicleTypes, default: VehicleTypes.MOTORCYCLE })
  public type: VehicleTypes
}
