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
  public static async saveCollection(name, userId) {
    let collection
    let times = 0

    while (times < 1000) {
      try {
        // @ts-ignore
        collection = await Collection.save({
          name,
          slug: times ? slugify(`${name}-${times}`, '-') : slugify(name, '-'),
          userId,
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

  public static async editCollection(input) {
    let collection
    let times = 0

    while (times < 1000) {
      try {
        // @ts-ignore
        collection = await Collection.save({
          ...input,
          slug: times ? slugify(`${input.name}-${times}`, '-') : slugify(input.name, '-'),
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

  @Column()
  public name: string

  @Column({ unique: true })
  public slug: string

  @Column()
  public userId: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date
}
