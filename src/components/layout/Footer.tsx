import { Camera, Instagram, Twitter, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer id="footer" className="border-t border-border bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Camera size={16} className="text-white" />
              </div>
              <span className="text-lg font-semibold text-primary">LUMI Booth</span>
            </div>
            <p className="text-sm text-secondary leading-relaxed">
              A premium browser-based photo booth. Capture, style, and share
              beautiful Korean-style photo strips — no app required.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <h4 className="font-semibold text-primary mb-3">Product</h4>
              <ul className="space-y-2 text-secondary">
                <li className="hover:text-accent cursor-pointer transition-colors">Features</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Frames</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-3">Company</h4>
              <ul className="space-y-2 text-secondary">
                <li className="hover:text-accent cursor-pointer transition-colors">About</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Privacy</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary">© {new Date().getFullYear()} LUMI Booth. All rights reserved.</p>
          <div className="flex items-center gap-4 text-secondary">
            <Instagram size={18} className="hover:text-accent cursor-pointer transition-colors" />
            <Twitter size={18} className="hover:text-accent cursor-pointer transition-colors" />
            <Github size={18} className="hover:text-accent cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  )
}
