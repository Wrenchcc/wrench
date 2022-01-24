import { makeVar } from '@apollo/client'

export const isMutedVar = makeVar(true)

export const pauseVar = makeVar(false)

export const toggleMute = () => {
  const isMuted = isMutedVar()
  isMutedVar(!isMuted)
}
