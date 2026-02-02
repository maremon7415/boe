"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Hammer, Github, Facebook, Twitter, MessageCircle, Globe, Construction } from "lucide-react"
import Link from "next/link"

export function UnderConstructionModal() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Check if the user has already seen the modal in this session
        // Using sessionStorage so it resets when the tab is closed, ensuring new visitors see it
        const hasSeenModal = sessionStorage.getItem("hasSeenUnderConstructionModal")
        if (!hasSeenModal) {
            // Small delay to make the entrance feel more deliberate after page load
            const timer = setTimeout(() => setIsOpen(true), 500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        sessionStorage.setItem("hasSeenUnderConstructionModal", "true")
    }

    // Developer Info from Footer
    const developer = {
        name: "MD. EMON MIAH",
        website: "https://emondev.netlify.app/",
        socials: [
            { icon: MessageCircle, href: "https://wa.me/8801785892074", color: "hover:text-green-500" },
            { icon: Facebook, href: "https://www.facebook.com/maremon15", color: "hover:text-blue-600" },
            { icon: Twitter, href: "https://x.com/maremon20", color: "hover:text-sky-500" },
            { icon: Github, href: "https://github.com/maremon7415", color: "hover:text-white" },
        ]
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-lg bg-[#0a0a0d] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay pointer-events-none" />

                        {/* Content */}
                        <div className="relative p-6 sm:p-8 flex flex-col items-center text-center">

                            {/* Icon Badge */}
                            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/20 flex items-center justify-center mb-6 shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)] relative group">
                                <div className="absolute inset-0 bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <Construction className="w-10 h-10 text-amber-500 relative z-10" />
                            </div>

                            {/* Text Content */}
                            <h2 className="text-3xl font-black tracking-custom text-white mb-4">
                                UNDER CONSTRUCTION
                            </h2>

                            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed mb-8">
                                <p>
                                    Welcome to <strong className="text-white">Brotherhood of Excellence</strong>.
                                    We are currently building something extraordinary for the <span className="text-primary font-medium">Esports Community</span>.
                                </p>
                                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-3 text-left">
                                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-amber-200/80 text-xs">
                                        You may encounter <strong>occasional bugs</strong> or <strong>UI inconsistencies</strong>.
                                        Please feel free to report any issues you find. Your feedback helps us improve!
                                    </p>
                                </div>
                            </div>

                            {/* Developer Section */}
                            <div className="w-full bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/5 mb-6 group/dev hover:border-white/10 transition-colors">
                                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 text-center">
                                    Project Developed By
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <Link
                                        href={developer.website}
                                        target="_blank"
                                        className="flex items-center gap-3 pl-2"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full blur-md opacity-50 animate-pulse" />
                                            <div className="relative p-1.5 rounded-full bg-black border border-white/10">
                                                <Globe size={18} className="text-indigo-400" />
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-sm text-white group-hover/dev:text-indigo-400 transition-colors">
                                                {developer.name}
                                            </div>
                                            <div className="text-[10px] text-muted-foreground">Full Stack Developer</div>
                                        </div>
                                    </Link>

                                    <div className="flex items-center gap-2">
                                        {developer.socials.map((social, idx) => (
                                            <Link
                                                key={idx}
                                                href={social.href}
                                                target="_blank"
                                                className={`p-2 rounded-lg bg-white/5 border border-white/5 text-muted-foreground hover:bg-white/10 hover:scale-110 transition-all ${social.color}`}
                                            >
                                                <social.icon size={16} />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleClose}
                                className="w-full py-3.5 px-4 bg-linear-to-r from-primary to-primary/80 text-black font-bold text-sm uppercase tracking-wide rounded-xl hover:shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                Enter Website
                            </button>

                        </div>

                        {/* Close Button (Top Right) */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-white rounded-full hover:bg-white/10 transition-colors z-20"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

function AlertTriangle({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    )
}
