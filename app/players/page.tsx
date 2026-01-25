"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useData } from "@/contexts/data-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { Users, Filter } from "lucide-react"
import type { Player } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PlayersPage() {
  const { players } = useData()
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("points")

  // Get unique positions
  const positions = Array.from(new Set(players.map((p) => p.position)))

  // Filter and sort players
  const filteredPlayers = players
    .filter((player) => positionFilter === "all" || player.position === positionFilter)
    .sort((a, b) => {
      if (sortBy === "points") return b.points - a.points
      if (sortBy === "goals") return b.goalsFor - a.goalsFor
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return 0
    })

  const getFormBadgeVariant = (result: "W" | "D" | "L") => {
    if (result === "W") return "default"
    if (result === "D") return "secondary"
    return "destructive"
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-10 w-10" />
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">PLAYERS</h1>
              </div>
              <p className="text-muted-foreground text-lg">Meet the Brotherhood of Excellence roster</p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="points">Points</SelectItem>
                    <SelectItem value="goals">Goals</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Players Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card
                    className="hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => setSelectedPlayer(player)}
                  >
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Avatar className="h-24 w-24 mx-auto mb-4 ring-2 ring-border group-hover:ring-primary transition-all">
                          <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                          <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-xl mb-1">{player.name}</h3>
                        <Badge variant="outline" className="mb-4">
                          {player.position}
                        </Badge>
                        <div className="grid grid-cols-3 gap-2 text-center mb-4">
                          <div>
                            <div className="text-2xl font-bold">{player.points}</div>
                            <div className="text-xs text-muted-foreground uppercase">Points</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">{player.goalsFor}</div>
                            <div className="text-xs text-muted-foreground uppercase">Goals</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">{player.won}</div>
                            <div className="text-xs text-muted-foreground uppercase">Wins</div>
                          </div>
                        </div>
                        <div className="flex gap-1 justify-center">
                          {player.form.map((result, i) => (
                            <Badge
                              key={i}
                              variant={getFormBadgeVariant(result)}
                              className="w-6 h-6 p-0 text-xs flex items-center justify-center"
                            >
                              {result}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Player Detail Modal */}
      <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPlayer && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedPlayer.avatar || "/placeholder.svg"} alt={selectedPlayer.name} />
                    <AvatarFallback>{selectedPlayer.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-3xl">{selectedPlayer.name}</DialogTitle>
                    <DialogDescription className="text-base">{selectedPlayer.position}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-muted-foreground">
                    Season Statistics
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold">{selectedPlayer.played}</div>
                      <div className="text-xs text-muted-foreground uppercase">Played</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-500">{selectedPlayer.won}</div>
                      <div className="text-xs text-muted-foreground uppercase">Won</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-yellow-500">{selectedPlayer.drawn}</div>
                      <div className="text-xs text-muted-foreground uppercase">Drawn</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-red-500">{selectedPlayer.lost}</div>
                      <div className="text-xs text-muted-foreground uppercase">Lost</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-muted-foreground">
                    Goal Statistics
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold">{selectedPlayer.goalsFor}</div>
                      <div className="text-xs text-muted-foreground uppercase">Goals For</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold">{selectedPlayer.goalsAgainst}</div>
                      <div className="text-xs text-muted-foreground uppercase">Goals Against</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold">
                        {selectedPlayer.goalDifference > 0
                          ? `+${selectedPlayer.goalDifference}`
                          : selectedPlayer.goalDifference}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase">Difference</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-muted-foreground">
                    Recent Form
                  </h4>
                  <div className="flex gap-2">
                    {selectedPlayer.form.map((result, i) => (
                      <Badge
                        key={i}
                        variant={getFormBadgeVariant(result)}
                        className="w-12 h-12 text-lg flex items-center justify-center"
                      >
                        {result}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <div className="text-5xl font-bold mb-1">{selectedPlayer.points}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Total Points</div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
