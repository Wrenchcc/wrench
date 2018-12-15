import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import Brand from '../Brand'

@Entity('models')
export default class Model extends BaseEntity {
  @ManyToOne(() => Brand, brand => brand.models)
  public brand: Brand

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @Column()
  public model: string

  @Column()
  public year: number
}
