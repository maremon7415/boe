"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard, Settings, Trophy, Users, Home, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter, usePathname } from "next/navigation"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, loggedIn, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isAdmin = user?.role === "ADMIN" || user?.role === "ADMINISTRATOR"

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "/players", label: "Players", icon: Users },
    { href: "/tournaments", label: "Tournaments", icon: Trophy },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm h-16"
        : "bg-transparent border-b border-transparent h-20"
        }`}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/boe.jpg"
                alt="BOE Logo"
                fill
                className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                priority
              />
            </div>
            <span className={`text-xl font-bold tracking-tighter ${scrolled ? "text-foreground" : "text-foreground"}`}>
              BOE <span className="text-primary hidden sm:inline-block">ESPORTS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary uppercase tracking-wider group ${isActive(link.href) ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {loggedIn ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 hidden lg:flex text-muted-foreground hover:text-primary"
                    onClick={() => router.push("/admin")}
                  >
                    <LayoutDashboard size={16} />
                    Admin
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/20 hover:ring-primary transition-all p-0 overflow-hidden">
                      <Avatar className="h-full w-full">
                        <AvatarImage src={user?.avatar} alt={user?.fullName || "User"} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {user?.fullName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.fullName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/player/profile")}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => router.push("/admin")}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Admin Panel</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem disabled>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" asChild className="hover:text-primary">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-shadow duration-300" asChild>
                  <Link href="/register">Join Us</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:bg-primary/10 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {loggedIn && (
                <div className="flex items-center gap-4 mb-4 p-3 rounded-lg bg-card/50 border border-border/50">
                  <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">{user?.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}

              {loggedIn && isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground text-orange-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}

              <div className="my-2 border-t border-border/50" />

              {loggedIn ? (
                <>
                  <Link
                    href="/player/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Log In
                    </Link>
                  </Button>
                  <Button className="w-full bg-primary" asChild>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      Join Us
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
