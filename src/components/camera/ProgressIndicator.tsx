import { motion } from 'framer-motion'

interface ProgressIndicatorProps {
  current: number
  total: number
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const percentage = Math.min((current / total) * 100, 100)

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-primary">
          Photo {Math.min(current, total)} of {total}
        </span>
        <span className="text-xs text-secondary">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-border overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <div className="flex gap-2 mt-3 justify-center">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i < current ? 'bg-accent' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
