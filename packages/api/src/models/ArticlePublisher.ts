import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('article_publishers')
export default class ArticlePublisher extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public slug: string

  @Column()
  public name: string

  @Column()
  public url: string

  @Column()
  public logoUrl: string
}
