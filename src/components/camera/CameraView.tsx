import { forwardRef } from 'react'
import Webcam from 'react-webcam'
import { motion } from 'framer-motion'
import { CameraOff, Loader2, ShieldAlert } from 'lucide-react'
import type { CameraStatus } from '@/hooks/useCamera'

interface CameraViewProps {
  status: CameraStatus
  facingMode: 'user' | 'environment'
  isMirrored: boolean
  onRetryPermission: () => void
}

export const CameraView = forwardRef<Webcam, CameraViewProps>(
  ({ status, facingMode, isMirrored, onRetryPermission }, ref) => {
    return (
      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black shadow-elevated border border-border">
        {status === 'ready' && (
          <Webcam
            ref={ref}
            audio={false}
            mirrored={isMirrored}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode, width: 1280, height: 960 }}
            className="w-full h-full object-cover"
          />
        )}

        {status === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white bg-neutral-900">
            <Loader2 size={32} className="animate-spin text-accent" />
            <p className="text-sm text-white/70">Requesting camera access…</p>
          </div>
        )}

        {status === 'denied' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white bg-neutral-900 px-6 text-center">
            <ShieldAlert size={32} className="text-red-400" />
            <p className="font-medium">Camera access denied</p>
            <p className="text-sm text-white/60 max-w-xs">
              Please allow camera permission in your browser settings to use the photo booth.
            </p>
            <button
              onClick={onRetryPermission}
              className="mt-2 px-5 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </div>
        )}

        {status === 'unavailable' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white bg-neutral-900 px-6 text-center">
            <CameraOff size={32} className="text-white/60" />
            <p className="font-medium">No camera detected</p>
            <p className="text-sm text-white/60 max-w-xs">
              We couldn't find a webcam on this device. Please connect one and refresh.
            </p>
          </div>
        )}

        <motion.div
          className="absolute inset-0 border-4 border-accent/0 rounded-3xl pointer-events-none"
          animate={{ borderColor: status === 'ready' ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0)' }}
        />
      </div>
    )
  }
)

CameraView.displayName = 'CameraView'
