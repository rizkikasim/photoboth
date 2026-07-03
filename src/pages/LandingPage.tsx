import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Wand2, Download, Palette, ChevronDown } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { usePhotoBooth } from '@/context/PhotoBoothContext'

const features = [
  {
    icon: Sparkles,
    title: 'Studio-Grade Countdown',
    description: 'A smooth, animated 3-2-1 countdown gives you time to strike the perfect pose every time.',
  },
  {
    icon: Palette,
    title: 'Curated Frame Styles',
    description: 'Choose from six elegant photo strip designs, from Classic White to moody Film Style.',
  },
  {
    icon: Wand2,
    title: 'Automatic 4-Cut Strip',
    description: 'Four photos are captured automatically and composed into a beautiful vertical strip.',
  },
  {
    icon: Download,
    title: 'High-Res Download',
    description: 'Export your finished strip as a crisp, high-resolution PNG — ready to print or share.',
  },
]

export function LandingPage() {
  const { setStage } = usePhotoBooth()

  return (
    <div className="min-h-screen bg-bg overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-28 px-6">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F3EFFF] via-bg to-bg" />
          <motion.div
            className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-accent/10 blur-3xl animate-float-slow"
          />
          <motion.div
            className="absolute top-40 right-[8%] w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border shadow-soft text-xs font-medium text-secondary mb-8"
          >
            <Sparkles size={14} className="text-accent" />
            Straight from your browser — no app needed
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.05]"
          >
            Your moments,
            <br />
            <span className="text-gradient">beautifully framed.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-secondary max-w-xl mx-auto leading-relaxed"
          >
            A premium Korean-style photo booth, right in your browser. Snap four
            photos, pick a frame, and download your strip in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Button size="lg" onClick={() => setStage('booth')} icon={<ArrowRight size={18} />}>
              Start Your Session
            </Button>
            <Button size="lg" variant="secondary" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-center mt-20 text-secondary"
        >
          <ChevronDown size={22} />
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Why choose LUMI Booth
          </h2>
          <p className="mt-4 text-secondary leading-relaxed">
            Every detail — from countdown to download — is designed to feel effortless and premium.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-card rounded-3xl p-7 border border-border shadow-soft hover:shadow-card transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                <feature.icon size={22} className="text-accent" />
              </div>
              <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto rounded-4xl bg-primary text-white px-10 py-16 text-center relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/30 rounded-full blur-3xl" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight relative">
            Ready for your photo strip?
          </h2>
          <p className="mt-4 text-white/70 max-w-md mx-auto relative">
            Grant camera access, strike a pose, and walk away with a printable memory.
          </p>
          <div className="mt-8 relative">
            <Button size="lg" onClick={() => setStage('booth')} icon={<ArrowRight size={18} />}>
              Start Your Session
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
