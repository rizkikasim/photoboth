import { AnimatePresence, motion } from 'framer-motion'

interface CaptureFlashProps {
  trigger: boolean
}

export function CaptureFlash({ trigger }: CaptureFlashProps) {
  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, times: [0, 0.2, 1] }}
          className="absolute inset-0 bg-white z-30 rounded-3xl pointer-events-none"
        />
      )}
    </AnimatePresence>
  )
}
