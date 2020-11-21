import { makeVar } from '@apollo/client'

export const isMutedVar = makeVar(true)

export const toggleMute = () => {
  const isMuted = isMutedVar()
  isMutedVar(!isMuted)
}
