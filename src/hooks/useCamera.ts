import { useCallback, useEffect, useState } from 'react'

export type CameraStatus = 'idle' | 'loading' | 'ready' | 'denied' | 'unavailable'

export function useCamera() {
  const [status, setStatus] = useState<CameraStatus>('idle')
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')

  const requestPermission = useCallback(async () => {
    setStatus('loading')
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('unavailable')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach((track) => track.stop())
      setStatus('ready')
    } catch (err) {
      setStatus('denied')
    }
  }, [])

  const switchCamera = useCallback(() => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'))
  }, [])

  useEffect(() => {
    requestPermission()
  }, [requestPermission])

  return { status, facingMode, requestPermission, switchCamera }
}
