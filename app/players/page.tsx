"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Users, Filter, Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

// Define Player interface to match API response
interface Player {
  _id: string
  fullName: string
  avatar: string
  role: string
  clubId: string
  stats: {
    points: number
    win: number
    draw: number
    loss: number
    goalsFor: number
    goalsAgainst: number
    goalDiff: number
    totalMatch: number
    form: ("W" | "D" | "L")[]
  }
}

export default function PlayersPage() {
  const router = useRouter()
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)

  // Filtering & Pagination State
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [sortBy, setSortBy] = useState("points")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalPlayers, setTotalPlayers] = useState(0)

  const roles = ["all", "MEMBER", "CAPTAIN", "ADMIN", "ADMINISTRATOR"]

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchPlayers()
    }, 500)
    return () => clearTimeout(timer)
  }, [search, roleFilter, sortBy, page])

  async function fetchPlayers() {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        search,
        role: roleFilter,
        sortBy
      })

      const res = await fetch(`/api/players?${queryParams}`)
      const data = await res.json()

      if (res.ok) {
        setPlayers(data.players)
        setTotalPages(data.totalPages)
        setTotalPlayers(data.total)
      }
    } catch (error) {
      console.error("Failed to fetch players", error)
    } finally {
      setLoading(false)
    }
  }

  const getFormBadgeVariant = (result: "W" | "D" | "L") => {
    if (result === "W") return "default" // usually green/primary
    if (result === "D") return "secondary" // usually gray
    return "destructive" // red
  }

  const handlePlayerClick = (playerId: string) => {
    router.push(`/player/${playerId}`)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">

        {/* Header Section */}
        <section className="py-16 bg-card border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -skew-y-2 transform origin-top-left" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">ROSTER</h1>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Meet the {totalPlayers} active players of the Brotherhood.
                  </p>
                </div>

                {/* Search & Stats Summary */}
                <div className="flex items-center gap-4">
                  <div className="bg-background/50 backdrop-blur-sm border border-white/10 p-4 rounded-xl text-center min-w-[120px]">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Total Players</p>
                    <p className="text-2xl font-black text-foreground">{totalPlayers}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters & Controls */}
        <section className="py-6 border-b border-border sticky top-16 z-30 bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search player by name..."
                  className="pl-10 bg-muted/50 border-white/10 focus:bg-background transition-colors"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium hidden sm:inline-block">Filter:</span>
                </div>

                <Select value={roleFilter} onValueChange={(val) => { setRoleFilter(val); setPage(1); }}>
                  <SelectTrigger className="w-full sm:w-[160px] bg-muted/50 border-white/10">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role === "all" ? "All Roles" : role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(val) => { setSortBy(val); setPage(1); }}>
                  <SelectTrigger className="w-full sm:w-[160px] bg-muted/50 border-white/10">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="points">Points (High-Low)</SelectItem>
                    <SelectItem value="goals">Goals (High-Low)</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
          </div>
        </section>

        {/* Players Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground animate-pulse">Scouting players...</p>
              </div>
            ) : players.length === 0 ? (
              <div className="text-center py-20 min-h-[400px] flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/5">
                <Users className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">No players found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                <Button
                  variant="link"
                  onClick={() => { setSearch(""); setRoleFilter("all"); }}
                  className="mt-4 text-primary"
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {players.map((player, index) => (
                  <motion.div
                    key={player._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card
                      className="hover:shadow-2xl hover:border-primary/50 transition-all cursor-pointer group bg-card/50 backdrop-blur-sm border-white/10 overflow-hidden"
                      onClick={() => handlePlayerClick(player._id)}
                    >
                      <CardContent className="pt-8 pb-6 px-6 relative">
                        {/* Role Badge */}
                        <div className="absolute top-3 right-3">
                          <Badge variant="outline" className="bg-background/50 backdrop-blur-md border-white/10 text-[10px]">
                            {player.role}
                          </Badge>
                        </div>

                        <div className="text-center">
                          {/* Avatar with Glow */}
                          <div className="relative inline-block mb-4">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                            <Avatar className="h-24 w-24 mx-auto ring-2 ring-border group-hover:ring-primary transition-all duration-300 relative z-10">
                              <AvatarImage src={player.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.clubId}`} alt={player.fullName} />
                              <AvatarFallback>{player.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                          </div>

                          <h3 className="font-bold text-lg mb-1 truncate group-hover:text-primary transition-colors">{player.fullName}</h3>
                          <p className="text-xs text-muted-foreground font-mono mb-5">{player.clubId}</p>

                          {/* Mini Stats */}
                          <div className="grid grid-cols-3 gap-2 text-center mb-6 bg-background/40 rounded-lg p-2 border border-white/5">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">PTS</span>
                              <span className="text-xl font-black text-primary">{player.stats.points}</span>
                            </div>
                            <div className="flex flex-col border-x border-white/5">
                              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Goals</span>
                              <span className="text-xl font-bold">{player.stats.goalsFor}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Wins</span>
                              <span className="text-xl font-bold text-green-500">{player.stats.win}</span>
                            </div>
                          </div>

                          {/* Form */}
                          <div className="flex gap-1 justify-center h-5 items-center">
                            {player.stats.form && player.stats.form.slice(-5).map((result, i) => (
                              <div
                                key={i}
                                className={`w-1.5 h-6 rounded-full transition-all duration-300 ${result === "W" ? "bg-green-500 group-hover:bg-green-400" :
                                    result === "D" ? "bg-yellow-500 group-hover:bg-yellow-400" :
                                      "bg-red-500 group-hover:bg-red-400"
                                  }`}
                                title={result === "W" ? "Win" : result === "D" ? "Draw" : "Loss"}
                              />
                            ))}
                            {(!player.stats.form || player.stats.form.length === 0) && (
                              <span className="text-[10px] text-muted-foreground italic">No recent matches</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12 mb-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                  className="rounded-full w-10 h-10 border-white/10 hover:bg-white/5"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium">
                  Page <span className="text-primary">{page}</span> of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages}
                  className="rounded-full w-10 h-10 border-white/10 hover:bg-white/5"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
