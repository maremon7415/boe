"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Info, Users, Trophy, User as UserIcon, LayoutDashboard, LogIn, UserPlus, ShieldCheck, Gamepad2, Sparkles } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function MobileNav() {
    const pathname = usePathname()
    const router = useRouter()
    const { user, loggedIn } = useAuth()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const isAdmin = user?.role === "ADMIN" || user?.role === "ADMINISTRATOR"

    const navItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/tournaments", label: "Events", icon: Trophy },
        { href: "/players", label: "Roster", icon: Users },
        { href: "/about", label: "About", icon: Info },
    ]

    const handleProfileClick = () => {
        if (!loggedIn) {
            setIsDrawerOpen(true)
        }
    }

    return (
        <>
            {/* Floating Dock Container */}
            <div className="fixed bottom-6 left-4 right-4 z-50 md:hidden flex justify-center">
                <nav className="flex items-center justify-between w-full max-w-md px-2 py-2 bg-[#0a0a0d]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/5">

                    {/* Standard Links */}
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative flex flex-col items-center justify-center flex-1 h-14 min-w-14"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white/10 rounded-xl"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <div className={cn("relative z-10 flex flex-col items-center gap-1 transition-colors duration-200",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}>
                                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-[9px] font-bold tracking-wide uppercase">{item.label}</span>
                                </div>
                            </Link>
                        )
                    })}

                    {/* Admin Link (Conditional) */}
                    {isAdmin && (
                        <Link
                            href="/admin"
                            className="relative flex flex-col items-center justify-center flex-1 h-14 min-w-14"
                        >
                            {pathname.startsWith("/admin") && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-orange-500/10 rounded-xl"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <div className={cn("relative z-10 flex flex-col items-center gap-1 transition-colors duration-200",
                                pathname.startsWith("/admin") ? "text-orange-500" : "text-muted-foreground"
                            )}>
                                <ShieldCheck size={20} strokeWidth={pathname.startsWith("/admin") ? 2.5 : 2} />
                                <span className="text-[9px] font-bold tracking-wide uppercase">Admin</span>
                            </div>
                        </Link>
                    )}

                    {/* Profile / Auth Trigger */}
                    {loggedIn ? (
                        <Link
                            href="/player/profile"
                            className="relative flex flex-col items-center justify-center flex-1 h-14 min-w-14"
                        >
                            {pathname === "/player/profile" && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white/10 rounded-xl"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <div className={cn("relative z-10 flex flex-col items-center gap-1 transition-colors duration-200",
                                pathname === "/player/profile" ? "text-primary" : "text-muted-foreground"
                            )}>
                                <UserIcon size={20} strokeWidth={pathname === "/player/profile" ? 2.5 : 2} />
                                <span className="text-[9px] font-bold tracking-wide uppercase">Profile</span>
                            </div>
                        </Link>
                    ) : (
                        <button
                            onClick={handleProfileClick}
                            className="relative flex flex-col items-center justify-center flex-1 h-14 min-w-14 active:scale-95 transition-transform"
                        >
                            <div className="relative z-10 flex flex-col items-center gap-1 text-muted-foreground hover:text-white transition-colors">
                                <UserIcon size={20} />
                                <span className="text-[9px] font-bold tracking-wide uppercase">Login</span>
                            </div>
                        </button>
                    )}
                </nav>
            </div>

            {/* Premium Auth Drawer */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="bg-[#0a0a0d] border-t border-white/10 outline-none">
                    <div className="mx-auto w-full max-w-sm pb-8">

                        {/* Drawer Header Art */}
                        <div className="relative pt-8 pb-4 flex justify-center">
                            <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent opacity-50 pointer-events-none" />
                            <div className="relative bg-white/5 p-4 rounded-full border border-white/10 shadow-[0_0_30px_rgba(var(--primary),0.2)]">
                                <Gamepad2 className="w-8 h-8 text-primary" />
                            </div>
                        </div>

                        <DrawerHeader>
                            <DrawerTitle className="text-3xl font-black text-center tracking-tighter text-white">
                                JOIN THE <span className="text-primary">ELITE</span>
                            </DrawerTitle>
                            <DrawerDescription className="text-center text-muted-foreground text-base px-4">
                                Access your player stats, register for tournaments, and climb the leaderboards.
                            </DrawerDescription>
                        </DrawerHeader>

                        <div className="p-6 flex flex-col gap-4">
                            <Button
                                onClick={() => { setIsDrawerOpen(false); router.push("/login") }}
                                className="w-full bg-white text-black hover:bg-white/90 h-14 text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all"
                            >
                                <LogIn className="mr-2 h-5 w-5" />
                                Commander Login
                            </Button>

                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0a0a0d] px-2 text-muted-foreground">Or</span></div>
                            </div>

                            <Button
                                onClick={() => { setIsDrawerOpen(false); router.push("/register") }}
                                variant="outline"
                                className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white h-14 text-lg font-bold rounded-xl backdrop-blur-md"
                            >
                                <Sparkles className="mr-2 h-5 w-5 text-primary" />
                                New Recruit
                            </Button>
                        </div>

                        <DrawerFooter className="pt-0">
                            <DrawerClose asChild>
                                <Button variant="ghost" className="text-muted-foreground hover:text-white h-12 rounded-xl">Dismiss</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}