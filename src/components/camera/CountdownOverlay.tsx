import { AnimatePresence, motion } from 'framer-motion'

interface CountdownOverlayProps {
  value: number | null
}

export function CountdownOverlay({ value }: CountdownOverlayProps) {
  return (
    <AnimatePresence mode="wait">
      {value !== null && (
        <motion.div
          key="countdown-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20 rounded-3xl"
        >
          <AnimatePresence mode="wait">
            {value > 0 ? (
              <motion.span
                key={value}
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="text-white font-bold text-[9rem] leading-none drop-shadow-2xl select-none"
              >
                {value}
              </motion.span>
            ) : (
              <motion.span
                key="smile"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="text-white font-bold text-6xl leading-none drop-shadow-2xl select-none"
              >
                Smile!
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
