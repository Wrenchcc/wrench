import { useEffect, useState } from 'react'

type CachedScript = {
  src: string
  loaded: boolean
}

let cachedScripts: CachedScript[] = []

export default (src: string) => {
  // Keeping track of script loaded and error state
  const [state, setState] = useState({ loaded: false, error: false })

  useEffect(() => {
    // If cachedScripts array already includes src that means another instance ...
    // ... of this hook already loaded this script, so no need to load again.
    if (cachedScripts.some(script => script.src === src && script.loaded)) {
      setState({ loaded: true, error: false })
      return
    } else {
      cachedScripts.push({ src, loaded: false })

      // Create script
      let script = document.createElement('script')
      script.src = src
      script.async = true

      // Script event listener callbacks for load and error
      const onScriptLoad = () => {
        cachedScripts = cachedScripts.map(script => {
          if (script.src === src) {
            return { ...script, loaded: true }
          }

          return script
        })

        setState({ loaded: true, error: false })
      }

      const onScriptError = () => {
        // Remove from cachedScripts we can try loading again
        cachedScripts = cachedScripts.filter(script => script.src === src)
        setState({ loaded: true, error: true })
      }

      script.addEventListener('load', onScriptLoad)
      script.addEventListener('error', onScriptError)

      // Add script to document body
      document.body.appendChild(script)

      // Remove event listeners on cleanup
      return () => {
        script.removeEventListener('load', onScriptLoad)
        script.removeEventListener('error', onScriptError)
      }
    }
  }, [src]) // Only re-run effect if script src changes

  return [state.loaded, state.error]
}
