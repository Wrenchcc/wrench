// @ts-nocheck
import React, { useState } from 'react'
import { omit } from 'ramda'
import { useProjectTypesQuery, useEditUserMutation } from '@wrench/common'
import { useTranslation } from 'i18n'
import { Text, ProgressBar } from 'ui'
import { Base, Inner, Types, Title, Scroll, Image, Picture, Overlay, Next } from './styles'

const MIN_ITEMS = 3
const ITEM_SIZE = 172.5

export default function Onboarding() {
  const { t } = useTranslation('Onboarding')
  const { data, loading } = useProjectTypesQuery()
  const [editUser] = useEditUserMutation()
  const [items, setItems] = useState({})

  const isComplete = () => {
    if (Object.keys(items).length >= MIN_ITEMS) {
      return true
    }

    return false
  }

  const toggleSelection = (item) => {
    if (items[item.id]) {
      setItems(omit([item.id]))
    } else {
      setItems({
        ...items,
        [item.id]: item,
      })
    }
  }

  const progress = () => (Object.keys(items).length / 3) * 100

  const interestedIn = Object.keys(items).map((id) => ({ id }))

  return (
    <Base>
      <Inner>
        <Next
          opacity={isComplete() ? 1 : 0.5}
          disabled={!isComplete()}
          onClick={() =>
            editUser({
              variables: {
                input: {
                  interestedIn,
                },
              },
            })
          }
        >
          {t('next')}
        </Next>

        <Title color="white" fontSize={36}>
          {t('title')}
        </Title>

        <Text color="neutral">{t('description')}</Text>

        <Scroll>
          <Types>
            {!loading &&
              data.types.map((item) => {
                return (
                  <Picture
                    key={item.id}
                    width={ITEM_SIZE}
                    height={ITEM_SIZE}
                    onClick={() => toggleSelection(item)}
                  >
                    <Image
                      key={item.id}
                      source={item.imageUrl}
                      width={ITEM_SIZE}
                      height={ITEM_SIZE}
                      selected={items[item.id]}
                      lazy={false}
                    />
                    <Overlay>
                      <Text color="white" style={{ zIndex: 10 }}>
                        {item.title}
                      </Text>
                    </Overlay>
                  </Picture>
                )
              })}
          </Types>
        </Scroll>

        <ProgressBar progress={progress()} />
      </Inner>
    </Base>
  )
}
