import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { AppStage, CapturedPhoto, FrameStyle, PhotoBoothState } from '@/types'
import { FRAME_STYLES } from '@/components/frames/frameData'

interface PhotoBoothContextValue extends PhotoBoothState {
  setStage: (stage: AppStage) => void
  setSelectedFrame: (frame: FrameStyle) => void
  addPhoto: (photo: CapturedPhoto) => void
  resetPhotos: () => void
  setIsCapturing: (v: boolean) => void
  setCountdownValue: (v: number | null) => void
  setCurrentPhotoIndex: (v: number) => void
  toggleMirror: () => void
  setFooterText: (v: string) => void
  startNewSession: () => void
}

const PhotoBoothContext = createContext<PhotoBoothContextValue | null>(null)

export function PhotoBoothProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<AppStage>('landing')
  const [selectedFrame, setSelectedFrame] = useState<FrameStyle>(FRAME_STYLES[0])
  const [photos, setPhotos] = useState<CapturedPhoto[]>([])
  const [isCapturing, setIsCapturing] = useState(false)
  const [countdownValue, setCountdownValue] = useState<number | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isMirrored, setIsMirrored] = useState(true)
  const [footerText, setFooterText] = useState('LUMI BOOTH')

  const addPhoto = (photo: CapturedPhoto) => setPhotos((prev) => [...prev, photo])
  const resetPhotos = () => {
    setPhotos([])
    setCurrentPhotoIndex(0)
    setCountdownValue(null)
    setIsCapturing(false)
  }
  const toggleMirror = () => setIsMirrored((prev) => !prev)
  const startNewSession = () => {
    resetPhotos()
    setStage('landing')
  }

  const value = useMemo(
    () => ({
      stage,
      selectedFrame,
      photos,
      isCapturing,
      countdownValue,
      currentPhotoIndex,
      isMirrored,
      footerText,
      setStage,
      setSelectedFrame,
      addPhoto,
      resetPhotos,
      setIsCapturing,
      setCountdownValue,
      setCurrentPhotoIndex,
      toggleMirror,
      setFooterText,
      startNewSession,
    }),
    [stage, selectedFrame, photos, isCapturing, countdownValue, currentPhotoIndex, isMirrored, footerText]
  )

  return <PhotoBoothContext.Provider value={value}>{children}</PhotoBoothContext.Provider>
}

export function usePhotoBooth() {
  const ctx = useContext(PhotoBoothContext)
  if (!ctx) throw new Error('usePhotoBooth must be used within PhotoBoothProvider')
  return ctx
}
