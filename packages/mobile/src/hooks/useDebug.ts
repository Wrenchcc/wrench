import { useEffect, useRef } from 'react'

const useDebug = componentName => {
  const renders = useRef(0)

  useEffect(() => {
    if (__DEV__) {
      console.log(`[DEBUG] ${componentName} rerender: ${renders.current++}`)
    }
  })
}

export default useDebug
