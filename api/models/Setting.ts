import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class Setting extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number
}
