import { useEffect } from 'react'

const useDebug = componentName => {
  useEffect(() => {
    if (__DEV__) {
      console.log(`[DEBUG] render ${componentName}`)
    }
  })
}

export default useDebug
