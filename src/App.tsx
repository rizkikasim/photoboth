import { AnimatePresence, motion } from 'framer-motion'
import { PhotoBoothProvider, usePhotoBooth } from '@/context/PhotoBoothContext'
import { LandingPage } from '@/pages/LandingPage'
import { PhotoBoothPage } from '@/pages/PhotoBoothPage'
import { ResultPage } from '@/pages/ResultPage'

function AppShell() {
  const { stage } = usePhotoBooth()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {stage === 'landing' && <LandingPage />}
        {stage === 'booth' && <PhotoBoothPage />}
        {stage === 'result' && <ResultPage />}
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <PhotoBoothProvider>
      <AppShell />
    </PhotoBoothProvider>
  )
}

export default App
