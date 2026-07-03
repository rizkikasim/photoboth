import { useRef, useState, useCallback, useEffect } from 'react'
import type Webcam from 'react-webcam'
import { motion } from 'framer-motion'
import { FlipHorizontal2, RefreshCcw, Camera as CameraIcon, ArrowLeft } from 'lucide-react'
import { CameraView } from '@/components/camera/CameraView'
import { CountdownOverlay } from '@/components/camera/CountdownOverlay'
import { CaptureFlash } from '@/components/camera/CaptureFlash'
import { ProgressIndicator } from '@/components/camera/ProgressIndicator'
import { FrameSelector } from '@/components/frames/FrameSelector'
import { Button } from '@/components/ui/Button'
import { useCamera } from '@/hooks/useCamera'
import { useCountdown } from '@/hooks/useCountdown'
import { usePhotoBooth } from '@/context/PhotoBoothContext'

const TOTAL_PHOTOS = 4

export function PhotoBoothPage() {
  const { status, facingMode, requestPermission, switchCamera } = useCamera()
  const {
    selectedFrame,
    setSelectedFrame,
    photos,
    addPhoto,
    resetPhotos,
    isMirrored,
    toggleMirror,
    setStage,
  } = usePhotoBooth()

  const webcamRef = useRef<Webcam>(null)
  const [isSequenceRunning, setIsSequenceRunning] = useState(false)
  const [flash, setFlash] = useState(false)
  const shotsTakenRef = useRef(0)

  const capturePhoto = useCallback(() => {
    const dataUrl = webcamRef.current?.getScreenshot()
    if (dataUrl) {
      shotsTakenRef.current += 1
      addPhoto({ id: shotsTakenRef.current, dataUrl })
      setFlash(true)
      setTimeout(() => setFlash(false), 350)
    }
  }, [addPhoto])

  const { value: countdownValue, start: startCountdown } = useCountdown(3, capturePhoto)

  useEffect(() => {
    if (!isSequenceRunning) return
    if (countdownValue === null && !flash) {
      if (shotsTakenRef.current >= TOTAL_PHOTOS) {
        setIsSequenceRunning(false)
        setTimeout(() => setStage('result'), 600)
        return
      }
      const timer = setTimeout(() => startCountdown(), flash ? 500 : 300)
      return () => clearTimeout(timer)
    }
    
    return // 👈 Perbaikan TS7030: Memastikan semua logic path mengembalikan nilai (void)
  }, [isSequenceRunning, countdownValue, flash, startCountdown, setStage])

  const beginSession = () => {
    resetPhotos()
    shotsTakenRef.current = 0
    setIsSequenceRunning(true)
    setTimeout(() => startCountdown(), 400)
  }

  return (
    <div className="min-h-screen bg-bg px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-md flex items-center justify-between mb-6">
        <button
          onClick={() => setStage('landing')}
          className="flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-sm font-semibold text-primary">Photo Booth</h1>
        <div className="w-12" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md flex flex-col items-center gap-6"
      >
        <div className="relative w-full">
          <CameraView
            ref={webcamRef}
            status={status}
            facingMode={facingMode}
            isMirrored={isMirrored}
            onRetryPermission={requestPermission}
          />
          <CountdownOverlay value={countdownValue} />
          <CaptureFlash trigger={flash} />

          {status === 'ready' && !isSequenceRunning && (
            <div className="absolute top-3 right-3 flex gap-2 z-10">
              <button
                onClick={toggleMirror}
                className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                title="Toggle mirror"
              >
                <RefreshCcw size={15} />
              </button>
              <button
                onClick={switchCamera}
                className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                title="Switch camera"
              >
                <FlipHorizontal2 size={15} />
              </button>
            </div>
          )}
        </div>

        {isSequenceRunning || photos.length > 0 ? (
          <ProgressIndicator current={photos.length} total={TOTAL_PHOTOS} />
        ) : null}

        {!isSequenceRunning && (
          <>
            <FrameSelector selected={selectedFrame} onSelect={setSelectedFrame} />
            <Button
              size="lg"
              disabled={status !== 'ready'}
              onClick={beginSession}
              icon={<CameraIcon size={18} />}
              className="w-full disabled:opacity-40"
            >
              Start Capturing
            </Button>
            <p className="text-xs text-secondary text-center max-w-xs">
              We'll automatically take {TOTAL_PHOTOS} photos with a short countdown between each shot.
            </p>
          </>
        )}
      </motion.div>
    </div>
  )
}