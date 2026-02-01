"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Medal, Crown, TrendingUp, AlertCircle, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils" // Ensure you have a utility for class merging

// --- Types ---
interface Player {
  _id: string
  fullName: string
  clubId: string
  avatar: string
  role: string
  stats: {
    totalMatch: number
    win: number
    draw: number
    loss: number
    goalsFor: number
    goalsAgainst: number
    goalDiff: number
    points: number
    form: ("W" | "D" | "L")[]
  }
}

// --- Components ---

// 1. Podium Card for Top 3
const PodiumCard = ({ player, rank, delay }: { player: Player; rank: number; delay: number }) => {
  const isFirst = rank === 1
  const isSecond = rank === 2
  const isThird = rank === 3

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={cn(
        "relative flex flex-col items-center p-6 rounded-2xl border backdrop-blur-md shadow-2xl transition-all hover:-translate-y-2",
        isFirst
          ? "bg-gradient-to-b from-yellow-500/20 to-background border-yellow-500/50 z-10 scale-105 md:scale-110 order-1 md:order-2"
          : "bg-card/40 border-white/10 hover:border-white/20",
        isSecond ? "order-2 md:order-1" : "order-3 md:order-3"
      )}
    >
      {/* Rank Badge */}
      <div
        className={cn(
          "absolute -top-4 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2",
          isFirst ? "bg-yellow-500 text-black" : isSecond ? "bg-gray-300 text-black" : "bg-amber-700 text-white"
        )}
      >
        {isFirst ? <Crown className="w-3 h-3" /> : <Medal className="w-3 h-3" />}
        Rank {rank}
      </div>

      {/* Avatar */}
      <div className="relative mb-4 mt-2">
        {isFirst && (
          <div className="absolute -inset-4 bg-yellow-500/30 rounded-full blur-xl animate-pulse" />
        )}
        <Avatar className={cn("w-20 h-20 md:w-24 md:h-24 border-4",
          isFirst ? "border-yellow-500" : isSecond ? "border-gray-300" : "border-amber-700"
        )}>
          <AvatarImage src={player.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.clubId}`} />
          <AvatarFallback>{player.fullName.substring(0, 2)}</AvatarFallback>
        </Avatar>
      </div>

      {/* Info */}
      <h3 className="font-bold text-lg md:text-xl text-center line-clamp-1">{player.fullName}</h3>
      <p className="text-xs text-muted-foreground font-mono mb-4">{player.clubId}</p>

      {/* Stats Mini Grid */}
      <div className="grid grid-cols-3 gap-2 w-full text-center bg-background/50 rounded-lg p-2 border border-white/5">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase">Won</p>
          <p className="font-bold text-green-500">{player.stats.win}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase">Match</p>
          <p className="font-bold text-foreground">{player.stats.totalMatch}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase">Pts</p>
          <p className="font-black text-primary">{player.stats.points}</p>
        </div>
      </div>
    </motion.div>
  )
}

// 2. Skeleton Loader
const LeaderboardSkeleton = () => (
  <div className="space-y-6">
    {/* Podium Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-64 bg-muted/20 rounded-2xl animate-pulse border border-white/5" />
      ))}
    </div>
    {/* Table Skeleton */}
    <div className="bg-card/40 border border-white/10 rounded-2xl p-6 space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-12 w-full bg-muted/20 rounded-lg animate-pulse" />
      ))}
    </div>
  </div>
)

// --- Main Component ---
export function TopPlayersSection() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTopPlayers() {
      try {
        const res = await fetch("/api/players/top")
        if (res.ok) {
          const data = await res.json()
          setPlayers(data.players)
        }
      } catch (error) {
        console.error("Failed to fetch top players", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTopPlayers()
  }, [])

  const topThree = players.slice(0, 3)
  const restPlayers = players.slice(3)

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

      {/* Floating Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 border border-primary/20 mb-2"
          >
            <Trophy className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tighter"
          >
            HALL OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">CHAMPIONS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            delay={0.2}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            The elite performers of Season 5. Rankings based on points, goal difference, and tactical dominance.
          </motion.p>
        </div>

        {loading ? (
          <LeaderboardSkeleton />
        ) : players.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/20 rounded-3xl bg-muted/5">
            <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold">No Data Available</h3>
            <p className="text-muted-foreground">The season hasn't started yet.</p>
          </div>
        ) : (
          <>
            {/* 1. The Podium (Top 3) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 mb-16 max-w-5xl mx-auto items-end">
              {topThree[1] && <PodiumCard player={topThree[1]} rank={2} delay={0.2} />}
              {topThree[0] && <PodiumCard player={topThree[0]} rank={1} delay={0} />}
              {topThree[2] && <PodiumCard player={topThree[2]} rank={3} delay={0.4} />}
            </div>

            {/* 2. The Table (Rank 4+) */}
            {restPlayers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-white/10 bg-card/30 backdrop-blur-md shadow-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-white/10 bg-white/5 hover:bg-white/5">
                          <TableHead className="w-16 text-center font-bold">#</TableHead>
                          <TableHead className="font-bold">Player</TableHead>
                          <TableHead className="text-center">Matches</TableHead>
                          <TableHead className="text-center hidden md:table-cell text-green-500">W</TableHead>
                          <TableHead className="text-center hidden md:table-cell text-yellow-500">D</TableHead>
                          <TableHead className="text-center hidden md:table-cell text-red-500">L</TableHead>
                          <TableHead className="text-center hidden lg:table-cell text-muted-foreground">GF</TableHead>
                          <TableHead className="text-center hidden lg:table-cell text-muted-foreground">GA</TableHead>
                          <TableHead className="text-center hidden md:table-cell">GD</TableHead>
                          <TableHead className="text-center font-black text-primary text-lg">PTS</TableHead>
                          <TableHead className="text-right pr-6">Form</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {restPlayers.map((player, index) => {
                          // Real rank is index + 4 because we sliced the top 3
                          const rank = index + 4
                          return (
                            <TableRow key={player._id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                              <TableCell className="text-center font-mono text-muted-foreground font-medium">
                                {rank}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9 border border-white/10">
                                    <AvatarImage src={player.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.clubId}`} />
                                    <AvatarFallback>{player.fullName.slice(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                                      {player.fullName}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground font-mono">
                                      {player.clubId}
                                    </span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-center font-mono text-muted-foreground">
                                {player.stats.totalMatch}
                              </TableCell>
                              <TableCell className="text-center hidden md:table-cell font-bold text-green-500/80">
                                {player.stats.win}
                              </TableCell>
                              <TableCell className="text-center hidden md:table-cell font-bold text-yellow-500/80">
                                {player.stats.draw}
                              </TableCell>
                              <TableCell className="text-center hidden md:table-cell font-bold text-red-500/80">
                                {player.stats.loss}
                              </TableCell>
                              <TableCell className="text-center hidden lg:table-cell text-muted-foreground text-xs">
                                {player.stats.goalsFor}
                              </TableCell>
                              <TableCell className="text-center hidden lg:table-cell text-muted-foreground text-xs">
                                {player.stats.goalsAgainst}
                              </TableCell>
                              <TableCell className="text-center hidden md:table-cell font-bold">
                                <span className={cn(
                                  player.stats.goalDiff > 0 ? "text-green-400" : player.stats.goalDiff < 0 ? "text-red-400" : "text-muted-foreground"
                                )}>
                                  {player.stats.goalDiff > 0 ? `+${player.stats.goalDiff}` : player.stats.goalDiff}
                                </span>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20">
                                  <span className="font-bold text-primary">{player.stats.points}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right pr-6">
                                <div className="flex gap-1 justify-end">
                                  {player.stats.form.slice(-5).map((result, i) => (
                                    <div
                                      key={i}
                                      title={result === "W" ? "Win" : result === "D" ? "Draw" : "Loss"}
                                      className={cn(
                                        "w-2 h-2 rounded-full",
                                        result === "W" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                                          : result === "D" ? "bg-yellow-500"
                                            : "bg-red-500"
                                      )}
                                    />
                                  ))}
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  )
}