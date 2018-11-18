import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class Settings extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number
}
