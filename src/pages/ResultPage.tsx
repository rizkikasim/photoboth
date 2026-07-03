import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, RotateCcw, Sparkles, ArrowLeft, Check } from 'lucide-react'
import { PhotoStrip } from '@/components/photobooth/PhotoStrip'
import { Button } from '@/components/ui/Button'
import { usePhotoBooth } from '@/context/PhotoBoothContext'
import { downloadElementAsPNG } from '@/utils/downloadImage'

export function ResultPage() {
  const { photos, selectedFrame, footerText, setFooterText, setStage, startNewSession, resetPhotos } =
    usePhotoBooth()
  const stripRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = async () => {
    if (!stripRef.current) return
    setIsDownloading(true)
    try {
      await downloadElementAsPNG(stripRef.current, `lumi-booth-${Date.now()}.png`)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 2500)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleRetake = () => {
    resetPhotos()
    setStage('booth')
  }

  return (
    <div className="min-h-screen bg-bg px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-md flex items-center justify-between mb-6">
        <button
          onClick={handleRetake}
          className="flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} /> Retake
        </button>
        <h1 className="text-sm font-semibold text-primary">Your Photo Strip</h1>
        <div className="w-14" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="flex flex-col items-center gap-8 w-full"
      >
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium">
          <Sparkles size={13} /> Strip generated successfully
        </div>

        <PhotoStrip ref={stripRef} photos={photos} frame={selectedFrame} footerText={footerText} />

        <div className="w-full max-w-xs">
          <label className="text-xs font-medium text-secondary mb-1.5 block">Custom footer text</label>
          <input
            type="text"
            value={footerText}
            maxLength={20}
            onChange={(e) => setFooterText(e.target.value.toUpperCase())}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
            placeholder="LUMI BOOTH"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <Button
            size="lg"
            className="flex-1"
            onClick={handleDownload}
            disabled={isDownloading}
            icon={downloaded ? <Check size={18} /> : <Download size={18} />}
          >
            {isDownloading ? 'Preparing…' : downloaded ? 'Downloaded' : 'Download PNG'}
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <Button size="md" variant="secondary" className="flex-1" onClick={handleRetake} icon={<RotateCcw size={16} />}>
            Retake
          </Button>
          <Button size="md" variant="ghost" className="flex-1" onClick={startNewSession}>
            New Session
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
