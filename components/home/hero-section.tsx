"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { ChevronRight, Gamepad2, Trophy, Sparkles } from "lucide-react"

// Simplified variants for mobile performance
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const textRevealVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const HERO_IMAGES = [
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
  "/hero4.jpg",
  "/hero5.jpg",
]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // check mobile for animation optimization
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-dvh min-h-[600px] flex flex-col overflow-hidden bg-background">

      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 select-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: isMobile ? 1 : 1.1 }} // No scale on mobile to prevent jitter
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
            style={{
              backgroundImage: `url(${HERO_IMAGES[currentImageIndex]})`,
            }}
          >
            {/* Desktop Only Zoom Effect */}
            {!isMobile && (
              <motion.div
                className="absolute inset-0 bg-black/30"
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 6, ease: "linear" }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Stronger Bottom Gradient for Mobile Text Readability */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 md:via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-transparent md:via-background/50" />

        {/* Texture & Grid */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* --- MAIN CONTENT --- */}
      {/* Mobile: justify-end (bottom), Desktop: justify-center (middle) */}
      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col justify-end pb-24 md:justify-center md:pb-0">
        <motion.div
          className="max-w-4xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeInVariants} className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md shadow-[0_0_15px_rgba(var(--primary),0.2)]">
              <span className="flex items-center gap-2 text-primary text-[10px] md:text-sm font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                Welcome to the Arena
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-[clamp(4.5rem,7vw,9rem)] font-black tracking-tighter leading-[0.9] mb-4 md:mb-8 text-foreground drop-shadow-2xl">
            <div className="overflow-hidden">
              <motion.span variants={textRevealVariants} className="block">
                BROTHERHOOD
              </motion.span>
            </div>
            <div className="overflow-hidden flex flex-wrap gap-x-3 md:gap-x-4">
              <motion.span variants={textRevealVariants} className="block text-white/50">
                OF
              </motion.span>
              <motion.span
                variants={textRevealVariants}
                className="block text-transparent bg-clip-text bg-linear-to-r from-primary via-white to-primary bg-size-[200%_auto] animate-gradient pb-1 md:pb-2"
              >
                EXCELLENCE
              </motion.span>
            </div>
          </h1>

          {/* Description */}
          <motion.p
            variants={fadeInVariants}
            className="text-base md:text-2xl text-muted-foreground mb-8 max-w-xl md:max-w-2xl leading-relaxed text-balance drop-shadow-md"
          >
            Where champions rise and legends are etched in history. Join the elite circle of competitive gaming.
          </motion.p>

          {/* Buttons - Mobile Optimized Layout */}
          <motion.div
            variants={fadeInVariants}
            className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:gap-5 items-center w-full sm:w-auto"
          >
            <Button
              asChild
              size="lg"
              className="h-12 md:h-14 text-sm md:text-base uppercase font-bold tracking-widest bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.3)] w-full sm:w-auto"
            >
              <Link href="/register" className="flex items-center justify-center">
                Join Now
                <ChevronRight className="ml-1 md:ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 md:h-14 text-sm md:text-base uppercase font-bold tracking-widest border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white w-full sm:w-auto"
            >
              <Link href="/tournaments" className="flex items-center justify-center">
                Events
                <Trophy className="ml-1 md:ml-2 w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* --- LIVE STATUS CARD (Hidden on Mobile) --- */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-24 right-16 hidden lg:block z-20"
      >
        <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl p-6 shadow-2xl w-80 hover:-translate-y-2 transition-transform duration-300">
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute top-0 right-0" />
              <div className="p-3 bg-linear-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/20">
                <Gamepad2 className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Live Status</p>
              <p className="text-white font-bold text-lg">Season 5 Active</p>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-white/5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Active Players</span>
              <span className="text-green-400 font-mono bg-green-500/10 px-2 py-0.5 rounded text-xs">1,248</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Prize Pool</span>
              <span className="text-yellow-400 font-mono bg-yellow-500/10 px-2 py-0.5 rounded text-xs">$10,000</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- SCROLL INDICATOR (Desktop Only) --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1.5 backdrop-blur-sm bg-black/20"
        >
          <motion.div className="w-1 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}