import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'
import slugify from '../utils/slugify'

@Entity('hashtags')
export default class Hashtag extends BaseEntity {
  public static async findOrCreate(hashtags) {
    return Promise.all(
      hashtags.map(async name => {
        const slug = slugify(name, '-')
        const category = await Hashtag.findOne({
          name,
        })

        // NOTE: Used to cover slug genereated with '.'
        const s = await Hashtag.findOne({
          slug,
        })

        if (category || s) {
          return category || s
        }
        // @ts-ignore
        return Hashtag.save({
          name,
          slug,
        })
      })
    )
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column({ unique: true })
  public name: string

  @Column({ unique: true })
  public slug: string
}
