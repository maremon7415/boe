"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2, Trophy, Smartphone, Calendar, User as UserIcon, Shield, LogOut, Edit, Facebook, Twitter, Youtube, Disc, Linkedin, Instagram } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { EditProfileModal } from "@/components/edit-profile-modal"

export default function PlayerProfilePage() {
    const { user, loading, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
            <Navbar />

            {/* Profile Header Background */}
            <div className="h-40 md:h-60 w-full bg-linear-to-r from-violet-600/20 via-primary/20 to-blue-600/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl opacity-40"></div>
            </div>

            <main className="flex-1 container mx-auto px-4 sm:px-6 relative -mt-16 sm:-mt-24 z-10 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* Left Column: Stats Card & Sidebar */}
                    <div className="lg:col-span-4 xl:col-span-3 space-y-4 sm:space-y-6">
                        <Card className="text-center pt-8 border-primary/20 shadow-2xl bg-card/80 backdrop-blur-md overflow-hidden relative group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-purple-500 to-blue-500"></div>

                            <div className="absolute top-4 right-4 z-20">
                                <Badge variant={user.role === 'ADMINISTRATOR' ? "destructive" : "secondary"} className="shadow-sm">
                                    {user.role || 'MEMBER'}
                                </Badge>
                            </div>

                            <CardContent className="flex flex-col items-center px-4 md:px-6">
                                <div className="relative mb-4">
                                    <div className="absolute -inset-1 bg-linear-to-br from-primary to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                    <Avatar className="w-28 h-28 sm:w-32 sm:h-32 border-4 border-background shadow-xl relative">
                                        <AvatarImage src={user.avatar || "/placeholder-user.jpg"} alt={user.fullName} className="object-cover" />
                                        <AvatarFallback className="text-3xl font-bold bg-muted">{user.fullName?.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </div>


                                <h1 className="text-xl sm:text-2xl font-bold mb-1 truncate w-full" title={user.fullName}>{user.fullName}</h1>
                                <p className="text-sm sm:text-base text-muted-foreground mb-4 truncate w-full" title={user.email}>{user.email}</p>

                                {user.clubId && (
                                    <Badge variant="outline" className="mb-6 py-1 px-4 font-mono text-xs bg-background/50 backdrop-blur-sm border-primary/30">
                                        ID: {user.clubId}
                                    </Badge>
                                )}

                                <div className="w-full grid grid-cols-3 gap-2 border-t border-border/50 pt-6 mb-2">
                                    <div className="text-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                                        <div className="text-xl sm:text-2xl font-bold text-primary">{user.stats?.totalMatch || 0}</div>
                                        <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">Matches</div>
                                    </div>
                                    <div className="text-center p-2 rounded-lg hover:bg-primary/5 transition-colors border-x border-border/40">
                                        <div className="text-xl sm:text-2xl font-bold text-green-500">{user.stats?.win || 0}</div>
                                        <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">Won</div>
                                    </div>
                                    <div className="text-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                                        <div className="text-xl sm:text-2xl font-bold text-blue-500">{user.stats?.points || 0}</div>
                                        <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">Points</div>
                                    </div>
                                </div>

                                <div className="w-full mt-6 space-y-3">
                                    <EditProfileModal
                                        user={user}
                                        trigger={
                                            <Button variant="outline" className="w-full h-10 hover:bg-primary/10 hover:text-primary transition-all group/btn">
                                                <Edit className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                                Edit Profile
                                            </Button>
                                        }
                                    />
                                    <Button variant="ghost" className="w-full h-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" onClick={logout}>
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Sign Out
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Device Info Card (Mobile adjusted) */}
                        <Card className="border-border/60 shadow-md">
                            <CardHeader className="pb-3 pt-5">
                                <CardTitle className="text-base sm:text-lg flex items-center font-medium">
                                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                                        <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                    </div>
                                    Device Info
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pb-5">
                                {user.device ? (
                                    <ul className="space-y-3 text-sm">
                                        <li className="flex justify-between items-center p-2 bg-muted/40 rounded-md">
                                            <span className="text-muted-foreground pl-1">Name</span>
                                            <span className="font-semibold pr-1">{user.device?.name || "N/A"}</span>
                                        </li>
                                        <li className="flex justify-between items-center p-2 bg-muted/40 rounded-md">
                                            <span className="text-muted-foreground pl-1">Model</span>
                                            <span className="font-semibold pr-1">{user.device?.model || "N/A"}</span>
                                        </li>
                                    </ul>
                                ) : (
                                    <div className="p-4 text-center text-sm text-muted-foreground bg-muted/20 rounded-lg dashed border border-border/50">
                                        No device information added.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Details & History */}
                    <div className="lg:col-span-8 xl:col-span-9">
                        <Tabs defaultValue="overview" className="w-full">
                            <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0">
                                <TabsList className="w-full sm:w-auto h-auto justify-start inline-flex sm:flex bg-muted/50 p-1 rounded-xl mb-6">
                                    <TabsTrigger value="overview" className="rounded-lg px-4 sm:px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all text-sm sm:text-base">Overview</TabsTrigger>
                                    <TabsTrigger value="matches" className="rounded-lg px-4 sm:px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all text-sm sm:text-base">Match History</TabsTrigger>
                                    <TabsTrigger value="achievements" className="rounded-lg px-4 sm:px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all text-sm sm:text-base">Achievements</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="overview" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                    <p className="font-medium text-base font-mono bg-muted/30 px-2 py-1 rounded inline-block w-full">{user.efootballId || "N/A"}</p>
                                                </div>
                                                <div className="group">
                                                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Blood Group</p>
                                                    <p className="font-medium text-base flex items-center">
                                                        {user.bloodGroup ? (
                                                            <span className="bg-red-500/10 text-red-500 px-2 py-0.5 rounded text-sm font-bold">{user.bloodGroup}</span>
                                                        ) : "N/A"}
                                                    </p>
                                                </div>
                                                <div className="group">
                                                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Gender</p>
                                                    <p className="font-medium text-base">{user.gender || "N/A"}</p>
                                                </div>
                                                <div className="group">
                                                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Join Date</p>
                                                    <p className="font-medium text-base">
                                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                                                    </p>
                                                </div>
                                                <div className="group">
                                                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Status</p>
                                                    <p className="font-medium text-base flex items-center text-green-500">
                                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                                        Active
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="pt-6 border-t border-border/50">
                                                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-4">Social Connections</p>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                    {/* Facebook */}
                                                    {user.socialAccounts?.facebook ? (
                                                        <a href={user.socialAccounts.facebook} target="_blank" rel="noopener noreferrer"
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
                                                    {user.socialAccounts?.twitter ? (
                                                        <a href={`https://twitter.com/${user.socialAccounts.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
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
                                                    {user.socialAccounts?.discord ? (
                                                        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 gap-2 group relative hover:scale-105 transition-transform cursor-help" title={user.socialAccounts.discord}>
                                                            <Disc className="w-5 h-5 group-hover:animate-spin" />
                                                            <span className="text-xs font-medium truncate max-w-full px-1">{user.socialAccounts.discord}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-muted/20 text-muted-foreground/40 border border-border/30 gap-2 cursor-not-allowed grayscale opacity-60">
                                                            <Disc className="w-5 h-5" />
                                                            <span className="text-xs font-medium">Discord</span>
                                                        </div>
                                                    )}

                                                    {/* YouTube */}
                                                    {user.socialAccounts?.youtube ? (
                                                        <a href={user.socialAccounts.youtube} target="_blank" rel="noopener noreferrer"
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
                                                            {user.stats && user.stats.totalMatch > 0
                                                                ? Math.round((user.stats.win / user.stats.totalMatch) * 100)
                                                                : 0}<span className="text-lg text-muted-foreground font-normal">%</span>
                                                        </span>
                                                    </div>
                                                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-linear-to-r from-primary to-purple-500 transition-all duration-1000 ease-out"
                                                            style={{ width: `${user.stats && user.stats.totalMatch > 0 ? (user.stats.win / user.stats.totalMatch) * 100 : 0}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-2 text-right">Based on all time matches</p>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col items-center justify-center bg-green-500/5 border border-green-500/10 p-4 rounded-xl">
                                                        <div className="text-2xl sm:text-3xl font-bold text-green-500 mb-1">{user.stats?.goalsFor || 0}</div>
                                                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Goals For</div>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center bg-red-500/5 border border-red-500/10 p-4 rounded-xl">
                                                        <div className="text-2xl sm:text-3xl font-bold text-red-400 mb-1">{user.stats?.goalsAgainst || 0}</div>
                                                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Goals Against</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            <TabsContent value="matches" className="animate-in fade-in-50 zoom-in-95 duration-300">
                                <Card className="border-border/60">
                                    <CardHeader>
                                        <CardTitle>Recent Matches</CardTitle>
                                        <CardDescription>Your performance in recent tournaments and friendlies.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-center py-16 text-muted-foreground bg-muted/10">
                                        <div className="bg-muted/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Calendar className="w-10 h-10 opacity-40" />
                                        </div>
                                        <h3 className="text-lg font-medium text-foreground mb-1">No matches found</h3>
                                        <p className="max-w-xs mx-auto mb-6 text-sm">You haven't participated in any matches recently.</p>
                                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Brows Tournaments</Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="achievements" className="animate-in fade-in-50 zoom-in-95 duration-300">
                                <Card className="border-border/60">
                                    <CardHeader>
                                        <CardTitle>Trophy Cabinet</CardTitle>
                                        <CardDescription>Awards and achievements you have collected.</CardDescription>
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
