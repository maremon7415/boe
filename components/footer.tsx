import Link from "next/link"
import Image from "next/image"
import {
  Instagram,
  Twitter,
  Youtube,
  Twitch,
  Facebook,
  Github,
  Mail,
  MessageCircle,
  Globe,
  MapPin,
  ArrowUpRight
} from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-background pt-16 pb-8 overflow-hidden">

      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* --- MAIN DASHBOARD GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

          {/* CARD 1: BRANDING (Left, 4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-colors">
            <div className="space-y-6 text-center lg:text-left">
              {/* Logo Area */}
              <div className="relative inline-block mx-auto lg:mx-0">
                <div className="absolute -inset-4 bg-primary/30 blur-2xl rounded-full opacity-50" />
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                  <Image
                    src="/boe.jpg"
                    alt="BOE Logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tighter text-white mb-2">BOE GAMING</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The Brotherhood of Excellence. Forging the next generation of elite competitive gamers.
                </p>
              </div>
            </div>

            {/* Social Pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mt-8">
              <SocialPill href="https://twitter.com" icon={<Twitter size={16} />} />
              <SocialPill href="https://instagram.com" icon={<Instagram size={16} />} />
              <SocialPill href="https://youtube.com" icon={<Youtube size={16} />} />
              <SocialPill href="https://twitch.tv" icon={<Twitch size={16} />} />
            </div>
          </div>

          {/* RIGHT COLUMN WRAPPER (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* CARD 2: COMPACT NAVIGATION (Top) */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6 text-center lg:text-left opacity-80">
                Quick Menu
              </h4>

              {/* Flex Wrap Container - Saves Height on Mobile */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-3">
                <CompactLink href="/" label="Home" />
                <CompactLink href="/about" label="About" />
                <CompactLink href="/players" label="Roster" />
                <CompactLink href="/tournaments" label="Tournaments" />
                <div className="w-px h-6 bg-white/10 hidden sm:block mx-2" /> {/* Divider */}
                <CompactLink href="/rules" label="Rules" />
                <CompactLink href="/privacy" label="Privacy" />
                <CompactLink href="/terms" label="Terms" />
                <CompactLink href="/contact" label="Help Center" />
              </div>
            </div>

            {/* CARD 3: LOCATION & CONTACT (Bottom) */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">

              {/* Address */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-full text-primary border border-white/5">
                  <MapPin size={20} />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Headquarters</h5>
                  <p className="text-xs text-muted-foreground">123 Gaming Street, Esports City</p>
                </div>
              </div>

              <div className="w-px h-10 bg-white/10 hidden sm:block" />

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-full text-primary border border-white/5">
                  <Mail size={20} />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Inquiries</h5>
                  <a href="mailto:contact@boe.com" className="text-xs text-muted-foreground hover:text-white transition-colors">
                    contact@boe-gaming.com
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- CARD 4: DEVELOPER BAR (Bottom) --- */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <div className="text-xs text-muted-foreground font-medium order-2 md:order-1">
            &copy; {currentYear} BOE Gaming.
          </div>

          {/* Developer Credit */}
          <div className="order-1 md:order-2">
            <a
              href="https://emondev.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2 bg-white/5 rounded-full border border-white/5 hover:border-primary/30 transition-all"
            >
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-white transition-colors">Built by</span>
              <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                MD. EMON MIAH
                <Globe className="w-3 h-3 animate-pulse" />
              </span>
            </a>
          </div>

          {/* Dev Socials */}
          <div className="flex items-center gap-4 order-3">
            <DevSocialLink href="https://wa.me/8801785892074" icon={<MessageCircle size={16} />} color="hover:text-green-500" />
            <DevSocialLink href="https://www.facebook.com/maremon15" icon={<Facebook size={16} />} color="hover:text-blue-500" />
            <DevSocialLink href="https://x.com/maremon20" icon={<Twitter size={16} />} color="hover:text-sky-500" />
            <DevSocialLink href="https://github.com/maremon7415" icon={<Github size={16} />} color="hover:text-white" />
          </div>

        </div>

      </div>
    </footer>
  )
}

// --- SUB-COMPONENTS ---

function CompactLink({ href, label }: { href: string, label: string }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm text-muted-foreground hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex items-center gap-2 group min-w-[100px] justify-center"
    >
      {label}
      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
    </Link>
  )
}

function SocialPill({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/5 text-muted-foreground hover:text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 shadow-lg"
    >
      {icon}
    </a>
  )
}

function DevSocialLink({ href, icon, color }: { href: string, icon: React.ReactNode, color: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-muted-foreground p-2 rounded-lg hover:bg-white/5 transition-all duration-300 ${color}`}
    >
      {icon}
    </a>
  )
}