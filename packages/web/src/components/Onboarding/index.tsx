// @ts-nocheck
import React, { useState } from 'react'
import { omit } from 'ramda'
import { useQuery, useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { GET_PROJECT_TYPES } from 'graphql/queries/project/projectTypes'
import { EDIT_USER_MUTATION } from 'graphql/mutations/user/editUser'
import { Text, ProgressBar } from 'ui'
import { Base, Inner, Types, Title, Scroll, Image, Picture, Overlay, Next } from './styles'

const MIN_ITEMS = 3
const ITEM_SIZE = 172.5

export default function Onboarding() {
  const { t } = useTranslation()
  const { data, loading } = useQuery(GET_PROJECT_TYPES)
  const [editUser] = useMutation(EDIT_USER_MUTATION)
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
          {t('Onboarding:next')}
        </Next>

        <Title color="white" fontSize={36}>
          {t('Onboarding:title')}
        </Title>

        <Text color="neutral">{t('Onboarding:description')}</Text>

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
