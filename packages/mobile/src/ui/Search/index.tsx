import React, { useRef } from 'react'
// import PropTypes from 'prop-types'
import { Transition } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
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

function Search({ ...props }) {
  const transitionRef = useRef(null)
  const { t } = useTranslation()

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
}

Search.propTypes = {}

export default Search
