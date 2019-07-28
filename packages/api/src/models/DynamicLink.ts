import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { pathOr } from 'ramda'
import { DynamicLinkTypes } from './enums'

@Entity('dynamic_links')
export default class DynamicLink extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column('enum', { enum: DynamicLinkTypes })
  public type: DynamicLinkTypes

  @Column('uuid')
  public typeId: string

  @Column()
  public url: string
}

export async function getDynamicLink(typeId) {
  const dynamicLink = await DynamicLink.findOne({
    where: {
      typeId,
    },
  })

  return pathOr(null, ['url'], dynamicLink)
}
