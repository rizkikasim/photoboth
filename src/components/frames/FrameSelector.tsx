import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { FrameStyle } from '@/types'
import { FRAME_STYLES } from './frameData'

interface FrameSelectorProps {
  selected: FrameStyle
  onSelect: (frame: FrameStyle) => void
}

export function FrameSelector({ selected, onSelect }: FrameSelectorProps) {
  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-primary mb-3">Choose a frame style</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {FRAME_STYLES.map((frame) => {
          const isSelected = frame.id === selected.id
          return (
            <motion.button
              key={frame.id}
              onClick={() => onSelect(frame)}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="relative w-full aspect-[3/4] rounded-2xl border-2 shadow-soft transition-all"
                style={{
                  background: frame.preview,
                  borderColor: isSelected ? frame.accentColor : 'transparent',
                }}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: frame.accentColor }}
                  >
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </div>
              <span className="text-[11px] text-secondary font-medium text-center leading-tight">
                {frame.name}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
