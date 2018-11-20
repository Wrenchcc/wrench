import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import Users from './Users'

@Entity()
export default class Settings extends BaseEntity {
  @ManyToOne(type => Users, user => user.settings)
  public user: Users

  @PrimaryGeneratedColumn()
  private id: number

  @Column({ nullable: true })
  private parentId: number

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column()
  private type: string

  @Column({ nullable: true })
  private value: string

  static async findOrCreate(where, save) {
    const settingsRepo = Settings.getRepository()
    const settings = await settingsRepo.findOne({ where })

    if (settings) return settings

    return settingsRepo.save(save)
  }
}
