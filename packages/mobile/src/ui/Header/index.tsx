import React from 'react'
import Text from 'ui/Text'
import { Background, Base, Left, Center, Right } from './styles'

type HeaderProps = {
  headerTitle?: string
  headerLeft?: React.ReactNode
  headerRight?: React.ReactNode
  headerCenter?: React.ReactNode
  headerSubTitle?: string
  headerAnimation?: boolean
  onPress: () => void
}

function Header({
  headerLeft,
  headerTitle,
  headerRight,
  headerCenter,
  headerSubTitle,
  onPress,
}: HeaderProps) {
  return (
    <Background>
      <Base>
        {headerLeft && <Left>{headerLeft}</Left>}
        <Center>
          {headerTitle ? (
            <Text medium center numberOfLines={1} onPress={onPress}>
              {headerTitle}
            </Text>
          ) : (
            headerCenter
          )}

          {headerSubTitle && (
            <Text fontSize={11} numberOfLines={1} color="accent" center>
              {headerSubTitle}
            </Text>
          )}
        </Center>

        {headerRight && <Right>{headerRight}</Right>}
      </Base>
    </Background>
  )
}

export default Header
