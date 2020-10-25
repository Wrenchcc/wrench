import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import slugify from '../utils/slugify'
import User from './User'
import Comment from './Comment'

@Entity('blog_posts')
export default class BlogPost extends BaseEntity {
  public static async createPost(data) {
    let post
    let times = 0

    while (times < 100) {
      try {
        post = await BlogPost.save({
          ...data,
          slug: times ? slugify(`${data.title}-${times}`, '-') : slugify(data.title, '-'),
        })
        break
      } catch (err) {
        if (!err.detail.includes('already exists')) {
          throw err
        }
      }

      times += 1
    }

    return post
  }

  @ManyToOne(
    () => User,
    user => user.posts
  )
  public user: User

  @OneToMany(
    () => Comment,
    comment => comment.post
  )
  public comments: Comment[]

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public userId: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column()
  public title: string

  @Column('text', { nullable: true })
  public content: string

  @Column({ unique: true, nullable: true })
  public slug: string
}
