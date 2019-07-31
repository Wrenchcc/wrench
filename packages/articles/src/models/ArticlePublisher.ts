import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('article_publishers')
export default class ArticlePublisher extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @Column({ type: 'timestamptz' })
  public updatedAt: Date

  @Column()
  public slug: string

  @Column()
  public name: string

  @Column()
  public url: string

  @Column()
  public logoUrl: string
}
