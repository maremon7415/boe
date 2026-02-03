"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Calendar, Trophy, User as UserIcon, Shield, ChevronLeft, Share2, Facebook, Twitter, Youtube, Disc, Linkedin, Instagram } from "lucide-react"
import { motion } from "framer-motion"

interface Player {
    _id: string
    fullName: string
    clubId: string
    avatar: string
    role: string
    email: string
    createdAt: string
    bloodGroup: string
    gender?: string
    efootballId: string
    device?: {
        name: string
        model: string
    }
    socialAccounts?: {
        facebook?: string
        twitter?: string
        discord?: string
        youtube?: string
    }
    stats?: {
        totalMatch: number
        win: number
        draw: number
        loss: number
        goalsFor: number
        goalsAgainst: number
        points: number
        form: ("W" | "D" | "L")[]
    }
}

export default function PlayerProfilePage() {
    const { id } = useParams()
    const router = useRouter()
    const [player, setPlayer] = useState<Player | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPlayer() {
            try {
                const res = await fetch(`/api/player/${id}`)
                if (res.ok) {
                    const data = await res.json()
                    setPlayer(data.player)
                } else {
                    // Handle error (e.g. redirect to 404 or show message)
                    console.error("Player not found")
                }
            } catch (error) {
                console.error("Failed to fetch player", error)
            } finally {
                setLoading(false)
            }
        }
        if (id) {
            fetchPlayer()
        }
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!player) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
                <h1 className="text-2xl font-bold">Player not found</h1>
                <Button onClick={() => router.push('/players')}>Back to Roster</Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
            <Navbar />

            {/* Header Background */}
            <div className="h-40 md:h-60 w-full bg-linear-to-r from-violet-600/20 via-primary/20 to-blue-600/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl opacity-40"></div>

                <div className="container mx-auto px-4 h-full relative z-10 flex items-start pt-24 md:pt-32">
                    <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10" onClick={() => router.back()}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </div>
            </div>

            <main className="flex-1 container mx-auto px-4 sm:px-6 relative -mt-16 sm:-mt-24 z-10 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* Left Column: Stats Card & Sidebar */}
                    <div className="lg:col-span-4 xl:col-span-3 space-y-4 sm:space-y-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <Card className="text-center pt-8 border-primary/20 shadow-2xl bg-card/80 backdrop-blur-md overflow-hidden relative group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-purple-500 to-blue-500"></div>

                                <div className="absolute top-4 right-4 z-20">
                                    <Badge variant={player.role === 'ADMINISTRATOR' ? "destructive" : "secondary"} className="shadow-sm">
                                        {player.role || 'MEMBER'}
                                    </Badge>
                                </div>

                                <CardContent className="flex flex-col items-center px-4 md:px-6">
                                    <div className="relative mb-4">
                                        <div className="absolute -inset-1 bg-linear-to-br from-primary to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                        <Avatar className="w-28 h-28 sm:w-32 sm:h-32 border-4 border-background shadow-xl relative">
                                            <AvatarImage src={player.avatar || "/placeholder-user.jpg"} alt={player.fullName} className="object-cover" />
                                            <AvatarFallback className="text-3xl font-bold bg-muted">{player.fullName?.substring(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <h1 className="text-xl sm:text-2xl font-bold mb-1 truncate w-full" title={player.fullName}>{player.fullName}</h1>
                                    <p className="text-sm sm:text-base text-muted-foreground mb-4 truncate w-full" title={player.email}>{player.clubId}</p>

                                    <div className="w-full grid grid-cols-3 gap-2 border-t border-border/50 pt-6 mb-2">
                                        <div className="text-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                                            <div className="text-xl sm:text-2xl font-bold text-primary">{player.stats?.totalMatch || 0}</div>
                                            <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">Matches</div>
                                        </div>
                                        <div className="text-center p-2 rounded-lg hover:bg-primary/5 transition-colors border-x border-border/40">
                                            <div className="text-xl sm:text-2xl font-bold text-green-500">{player.stats?.win || 0}</div>
                                            <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">Won</div>
                                        </div>
                                        <div className="text-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                                            <div className="text-xl sm:text-2xl font-bold text-blue-500">{player.stats?.points || 0}</div>
                                            <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">Points</div>
                                        </div>
                                    </div>

                                    <div className="w-full mt-6">
                                        <Button variant="outline" className="w-full" onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                            // You might want to show a toast here
                                        }}>
                                            <Share2 className="w-4 h-4 mr-2" /> Share Profile
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Device Info Card (Hidden if no info) */}
                        {player.device && (player.device.name || player.device.model) && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                                <Card className="border-border/60 shadow-md">
                                    <CardHeader className="pb-3 pt-5">
                                        <CardTitle className="text-base sm:text-lg flex items-center font-medium">Device Info</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pb-5">
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex justify-between items-center p-2 bg-muted/40 rounded-md">
                                                <span className="text-muted-foreground pl-1">Name</span>
                                                <span className="font-semibold pr-1">{player.device?.name || "N/A"}</span>
                                            </li>
                                            <li className="flex justify-between items-center p-2 bg-muted/40 rounded-md">
                                                <span className="text-muted-foreground pl-1">Model</span>
                                                <span className="font-semibold pr-1">{player.device?.model || "N/A"}</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column: Details & History */}
                    <div className="lg:col-span-8 xl:col-span-9">
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="w-full sm:w-auto h-auto justify-start inline-flex sm:flex bg-muted/50 p-1 rounded-xl mb-6">
                                <TabsTrigger value="overview" className="rounded-lg px-4 sm:px-6 py-2.5">Overview</TabsTrigger>
                                <TabsTrigger value="matches" className="rounded-lg px-4 sm:px-6 py-2.5">Match History</TabsTrigger>
                                <TabsTrigger value="achievements" className="rounded-lg px-4 sm:px-6 py-2.5">Achievements</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                                        <Card className="h-full border-border/60 shadow-sm hover:shadow-md transition-shadow">
                                            <CardHeader>
                                                <CardTitle className="text-lg flex items-center">
                                                    <div className="p-2 bg-blue-500/10 rounded-lg mr-3">
                                                        <UserIcon className="w-5 h-5 text-blue-500" />
                                                    </div>
                                                    Personal Info
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                                                    <div className="group">
                                                        <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">eFootball ID</p>
                                                        <p className="font-medium text-base font-mono bg-muted/30 px-2 py-1 rounded inline-block w-full">{player.efootballId || "N/A"}</p>
                                                    </div>
                                                    <div className="group">
                                                        <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Blood Group</p>
                                                        <p className="font-medium text-base">{player.bloodGroup || "N/A"}</p>
                                                    </div>
                                                    <div className="group">
                                                        <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Gender</p>
                                                        <p className="font-medium text-base">{player.gender || "N/A"}</p>
                                                    </div>
                                                    <div className="group">
                                                        <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Joined</p>
                                                        <p className="font-medium text-base">
                                                            {player.createdAt ? new Date(player.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="pt-6 border-t border-border/50">
                                                    <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-4">Social Connections</p>
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                        {/* Facebook */}
                                                        {player.socialAccounts?.facebook ? (
                                                            <a href={player.socialAccounts.facebook} target="_blank" rel="noopener noreferrer"
                                                                className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 hover:scale-105 transition-all border border-blue-500/20 gap-2 group">
                                                                <Facebook className="w-5 h-5 group-hover:animate-bounce" />
                                                                <span className="text-xs font-medium">Facebook</span>
                                                            </a>
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-muted/20 text-muted-foreground/40 border border-border/30 gap-2 cursor-not-allowed grayscale opacity-60">
                                                                <Facebook className="w-5 h-5" />
                                                                <span className="text-xs font-medium">Facebook</span>
                                                            </div>
                                                        )}

                                                        {/* Twitter / X */}
                                                        {player.socialAccounts?.twitter ? (
                                                            <a href={`https://twitter.com/${player.socialAccounts.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                                                                className="flex flex-col items-center justify-center p-3 rounded-xl bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 hover:scale-105 transition-all border border-sky-500/20 gap-2 group">
                                                                <Twitter className="w-5 h-5 group-hover:animate-bounce" />
                                                                <span className="text-xs font-medium">Twitter</span>
                                                            </a>
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-muted/20 text-muted-foreground/40 border border-border/30 gap-2 cursor-not-allowed grayscale opacity-60">
                                                                <Twitter className="w-5 h-5" />
                                                                <span className="text-xs font-medium">Twitter</span>
                                                            </div>
                                                        )}

                                                        {/* Discord */}
                                                        {player.socialAccounts?.discord ? (
                                                            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 gap-2 group relative hover:scale-105 transition-transform cursor-help" title={player.socialAccounts.discord}>
                                                                <Disc className="w-5 h-5 group-hover:animate-spin" />
                                                                <span className="text-xs font-medium truncate max-w-full px-1">{player.socialAccounts.discord}</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-muted/20 text-muted-foreground/40 border border-border/30 gap-2 cursor-not-allowed grayscale opacity-60">
                                                                <Disc className="w-5 h-5" />
                                                                <span className="text-xs font-medium">Discord</span>
                                                            </div>
                                                        )}

                                                        {/* YouTube */}
                                                        {player.socialAccounts?.youtube ? (
                                                            <a href={player.socialAccounts.youtube} target="_blank" rel="noopener noreferrer"
                                                                className="flex flex-col items-center justify-center p-3 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500/20 hover:scale-105 transition-all border border-red-500/20 gap-2 group">
                                                                <Youtube className="w-5 h-5 group-hover:animate-bounce" />
                                                                <span className="text-xs font-medium">YouTube</span>
                                                            </a>
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-muted/20 text-muted-foreground/40 border border-border/30 gap-2 cursor-not-allowed grayscale opacity-60">
                                                                <Youtube className="w-5 h-5" />
                                                                <span className="text-xs font-medium">YouTube</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
                                        <Card className="h-full border-border/60 shadow-sm hover:shadow-md transition-shadow">
                                            <CardHeader>
                                                <CardTitle className="text-lg flex items-center">
                                                    <div className="p-2 bg-emerald-500/10 rounded-lg mr-3">
                                                        <Shield className="w-5 h-5 text-emerald-500" />
                                                    </div>
                                                    Performance Stats
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-6">
                                                    <div className="bg-muted/30 p-4 rounded-xl">
                                                        <div className="flex justify-between items-end mb-2">
                                                            <span className="text-sm font-medium text-muted-foreground">Win Rate</span>
                                                            <span className="text-3xl font-bold text-primary">
                                                                {player.stats && player.stats.totalMatch > 0
                                                                    ? Math.round((player.stats.win / player.stats.totalMatch) * 100)
                                                                    : 0}<span className="text-lg text-muted-foreground font-normal">%</span>
                                                            </span>
                                                        </div>
                                                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-linear-to-r from-primary to-purple-500"
                                                                style={{ width: `${player.stats && player.stats.totalMatch > 0 ? (player.stats.win / player.stats.totalMatch) * 100 : 0}%` }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="flex flex-col items-center justify-center bg-green-500/5 border border-green-500/10 p-4 rounded-xl">
                                                            <div className="text-2xl sm:text-3xl font-bold text-green-500 mb-1">{player.stats?.goalsFor || 0}</div>
                                                            <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Goals For</div>
                                                        </div>
                                                        <div className="flex flex-col items-center justify-center bg-red-500/5 border border-red-500/10 p-4 rounded-xl">
                                                            <div className="text-2xl sm:text-3xl font-bold text-red-400 mb-1">{player.stats?.goalsAgainst || 0}</div>
                                                            <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Goals Against</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </div>
                            </TabsContent>

                            <TabsContent value="matches">
                                <Card className="border-border/60">
                                    <CardHeader>
                                        <CardTitle>Recent Matches</CardTitle>
                                        <CardDescription>Performance history in recent games.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-center py-16 text-muted-foreground bg-muted/10">
                                        <div className="bg-muted/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Calendar className="w-10 h-10 opacity-40" />
                                        </div>
                                        <h3 className="text-lg font-medium text-foreground mb-1">No detailed match history</h3>
                                        <p className="max-w-xs mx-auto text-sm">Match details are not yet available for public view.</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="achievements" className="animate-in fade-in-50 zoom-in-95 duration-300">
                                <Card className="border-border/60">
                                    <CardHeader>
                                        <CardTitle>Trophy Cabinet</CardTitle>
                                        <CardDescription>Awards and achievements collected by this player.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-center py-16 text-muted-foreground bg-muted/10">
                                        <div className="bg-yellow-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Trophy className="w-10 h-10 text-yellow-500/50" />
                                        </div>
                                        <h3 className="text-lg font-medium text-foreground mb-1">No achievements yet</h3>
                                        <p className="max-w-xs mx-auto mb-2 text-sm">Compete in tournaments to earn trophies and badges.</p>
                                        <p className="text-xs text-muted-foreground mt-4 font-medium uppercase tracking-widest">Locked</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
