import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import slugify from '../utils/slugify'

@Entity('collections')
export default class Collection extends BaseEntity {
  public static async findOrCreate(name) {
    let collection
    let times = 0

    const found = await Collection.findOne({
      name,
    })

    if (found) {
      return found
    }

    while (times < 1000) {
      try {
        // @ts-ignore
        collection = await Collection.save({
          name,
          slug: times ? slugify(`${name}-${times}`, '-') : slugify(name, '-'),
        })
        break
      } catch (err) {
        if (!err.detail.includes('already exists')) {
          throw err
        }
      }

      times += 1
    }

    return collection
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ unique: true })
  public name: string

  @Column({ unique: true })
  public slug: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date
}
