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

  @PrimaryGeneratedColumn()
  private id: number

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column()
  private model: string

  @Column()
  private year: number
}
