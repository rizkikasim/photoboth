export type AppStage = 'landing' | 'booth' | 'result'

export interface FrameStyle {
  id: string
  name: string
  background: string
  borderColor: string
  textColor: string
  accentColor: string
  preview: string
}

export interface CapturedPhoto {
  id: number
  dataUrl: string
}

export interface PhotoBoothState {
  stage: AppStage
  selectedFrame: FrameStyle
  photos: CapturedPhoto[]
  isCapturing: boolean
  countdownValue: number | null
  currentPhotoIndex: number
  isMirrored: boolean
  footerText: string
}
