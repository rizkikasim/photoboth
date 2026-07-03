import { useCallback, useEffect, useRef, useState } from 'react'

export function useCountdown(seconds: number, onComplete: () => void) {
  const [value, setValue] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const start = useCallback(() => {
    setValue(seconds)
  }, [seconds])

  useEffect(() => {
    if (value === null) return
    if (value === 0) {
      timerRef.current = setTimeout(() => {
        onCompleteRef.current()
        setValue(null)
      }, 500)
      return
    }
    timerRef.current = setTimeout(() => {
      setValue((prev) => (prev !== null ? prev - 1 : prev))
    }, 1000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [value])

  return { value, start }
}
