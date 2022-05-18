import { useLayoutEffect, useRef } from 'react'

export function useResizeObserver (action, ref) {
  const resizer = useRef(
    new window.ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = Array.isArray(entry.contentBoxSize)
            ? entry.contentBoxSize[0]
            : entry.contentBoxSize
          action(contentBoxSize)
        } else {
          action(entry.contentRect)
        }
      }
    })
  )

  useLayoutEffect(() => {
    if (Array.isArray(ref)) {
      ref.forEach(({ current }) => resizer.current.observe(current))
    } else {
      resizer.current.observe(ref.current)
    }

    return () => resizer.current.disconnect()
  }, [])

  return resizer
}
