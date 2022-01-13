import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { VehicleTypes } from './enums'

@Entity('project_types')
export default class ProjectType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public slug: string

  @Column()
  public title: string

  @Column()
  public imageUrl: string

  @Column('enum', { enum: VehicleTypes, default: VehicleTypes.MOTORCYCLE })
  public type: VehicleTypes
}
