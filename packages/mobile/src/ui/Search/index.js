import React, { memo, useRef } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-native-reanimated'
import withTranslation from 'i18n/withTranslation'
import { search } from 'images'
import { COLORS } from 'ui/constants'
import { Base, Input, Icon } from './styles'

const transition = (
  <Transition.Sequence>
    <Transition.Out type="scale" />
    <Transition.Change interpolation="easeInOut" />
    <Transition.In type="fade" />
  </Transition.Sequence>
)

const Search = memo(function Search({ t, ...props }) {
  const transitionRef = useRef(null)

  // const handleFocus = () => {
  //   transitionRef.animateNextTransition()
  //   onSearchFocus && onSearchFocus()
  // }

  return (
    <Base ref={transitionRef} transition={transition}>
      <Input
        autoCorrect={false}
        placeholderTextColor={COLORS.LIGHT_GREY}
        selectionColor={COLORS.DARK}
        placeholder={t('Search:placeholder')}
        keyboardAppearance="dark"
        returnKeyType="search"
        {...props}
      />

      <Icon source={search} />
    </Base>
  )
})

Search.propTypes = {}

export default withTranslation('Search')(Search)
