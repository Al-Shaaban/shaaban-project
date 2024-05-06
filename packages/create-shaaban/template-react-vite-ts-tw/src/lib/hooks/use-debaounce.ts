import { useEffect, useRef, useState } from 'react'

export const useDebounce = (delay = 500) => {
  const [value, setValue] = useState<string>('')
  const [debouncedValue, setDebouncedValue] = useState<string>('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const onSearchChange = (newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [value, delay])

  return { debouncedValue, onSearchChange, value }
}
