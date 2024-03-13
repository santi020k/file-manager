import { useEffect, useRef, useState } from 'react'

export interface StartProgress {
  start: number
  increases: number
}

const useProgress = () => {
  const [
    progress,
    setProgress
  ] = useState(0)
  const refInterval = useRef<ReturnType<typeof setInterval>>()

  const resetCounter = () => {
    clearInterval(refInterval.current)
    refInterval.current = undefined
  }

  const startProgress = ({ start, increases }: StartProgress) => {
    setProgress(start)
    refInterval.current = setInterval(() => {
      setProgress(prev => (prev < 90
        ? prev + increases
        : prev))
    }, 1000)
  }

  const endProgress = () => {
    resetCounter()
    setProgress(100)
    setTimeout(() => {
      setProgress(0)
    }, 1000)
  }

  useEffect(() => {
    return endProgress
  }, [])

  return {
    progress,
    startProgress,
    endProgress
  }
}

export default useProgress
