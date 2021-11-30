import { useCallback, useState } from 'react'

export function useClientRect () {
  const [rect, setRect] = useState(null)
  console.log(2)
  const ref = useCallback(node => {
    console.log(3)
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
  }, [])
  return [rect, ref]
}
