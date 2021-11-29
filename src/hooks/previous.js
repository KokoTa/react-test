import { useEffect, useRef } from 'react'

export function usePrevious (value) {
  const ref = useRef()
  console.log(value)
  useEffect(() => {
    console.log(value)
    ref.current = value
  })
  console.log(ref.current)
  return ref.current
}
