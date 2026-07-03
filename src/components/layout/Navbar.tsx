import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { usePhotoBooth } from '@/context/PhotoBoothContext'

export function Navbar() {
  const { setStage } = usePhotoBooth()

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-40 glass border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setStage('landing')}>
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Camera size={18} className="text-white" strokeWidth={2} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-primary">LUMI Booth</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-secondary font-medium">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#frames" className="hover:text-primary transition-colors">Frames</a>
          <a href="#footer" className="hover:text-primary transition-colors">About</a>
        </nav>
        <Button size="sm" onClick={() => setStage('booth')}>
          Start Booth
        </Button>
      </div>
    </motion.header>
  )
}
