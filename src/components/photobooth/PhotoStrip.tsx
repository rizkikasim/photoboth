import { forwardRef } from 'react'
import { Camera } from 'lucide-react'
import type { CapturedPhoto, FrameStyle } from '@/types'
import { formatTodayDate } from '@/utils/dateFormat'

interface PhotoStripProps {
  photos: CapturedPhoto[]
  frame: FrameStyle
  footerText: string
}

export const PhotoStrip = forwardRef<HTMLDivElement, PhotoStripProps>(
  ({ photos, frame, footerText }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[300px] mx-auto rounded-[28px] p-4 shadow-elevated"
        style={{ backgroundColor: frame.background, border: `1px solid ${frame.borderColor}` }}
      >
        <div className="flex flex-col gap-3">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className="w-full aspect-[4/3] rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${frame.borderColor}` }}
            >
              <img
                src={photo.dataUrl}
                alt={`Captured frame ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 flex flex-col items-center gap-1" style={{ borderTop: `1px solid ${frame.borderColor}` }}>
          <div className="flex items-center gap-1.5">
            <Camera size={12} style={{ color: frame.accentColor }} />
            <span className="text-[11px] font-bold tracking-wider" style={{ color: frame.textColor }}>
              {footerText || 'LUMI BOOTH'}
            </span>
          </div>
          <span className="text-[10px]" style={{ color: frame.textColor, opacity: 0.6 }}>
            {formatTodayDate()}
          </span>
        </div>
      </div>
    )
  }
)

PhotoStrip.displayName = 'PhotoStrip'
