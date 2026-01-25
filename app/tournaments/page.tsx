"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useData } from "@/contexts/data-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Trophy, Calendar, Filter } from "lucide-react"
import type { Tournament } from "@/lib/types"
import { format } from "date-fns"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TournamentsPage() {
  const { tournaments, matches } = useData()
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  // Filter tournaments
  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesStatus = statusFilter === "all" || tournament.status === statusFilter
    const matchesType = typeFilter === "all" || tournament.type === typeFilter
    return matchesStatus && matchesType
  })

  const getStatusBadgeVariant = (status: string) => {
    if (status === "ongoing") return "default"
    if (status === "upcoming") return "secondary"
    return "outline"
  }

  const getTournamentMatches = (tournamentId: string) => {
    return matches.filter((match) => match.tournamentId === tournamentId)
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
                <Trophy className="h-10 w-10" />
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">TOURNAMENTS</h1>
              </div>
              <p className="text-muted-foreground text-lg">Compete in elite gaming competitions</p>
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="league">League</SelectItem>
                    <SelectItem value="cup">Cup</SelectItem>
                    <SelectItem value="solo">Solo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Tournaments Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTournaments.map((tournament, index) => (
                <motion.div
                  key={tournament.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-all cursor-pointer group h-full flex flex-col overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={tournament.image || "/placeholder.svg?height=200&width=400"}
                        alt={tournament.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant={getStatusBadgeVariant(tournament.status)} className="uppercase">
                          {tournament.status}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="uppercase">
                          {tournament.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{tournament.season}</span>
                      </div>
                      <CardTitle className="text-2xl">{tournament.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4" />
                        <span>Starts: {format(new Date(tournament.startDate), "PPP")}</span>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-auto w-full bg-transparent"
                        onClick={() => setSelectedTournament(tournament)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Tournament Detail Modal */}
      <Dialog open={!!selectedTournament} onOpenChange={() => setSelectedTournament(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedTournament && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <DialogTitle className="text-3xl mb-2">{selectedTournament.name}</DialogTitle>
                    <DialogDescription className="text-base">
                      {selectedTournament.type.toUpperCase()} • {selectedTournament.season}
                    </DialogDescription>
                  </div>
                  <Badge variant={getStatusBadgeVariant(selectedTournament.status)} className="uppercase">
                    {selectedTournament.status}
                  </Badge>
                </div>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={selectedTournament.image || "/placeholder.svg?height=300&width=800"}
                    alt={selectedTournament.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Start Date</div>
                    <div className="text-lg font-semibold">{format(new Date(selectedTournament.startDate), "PPP")}</div>
                  </div>
                  {selectedTournament.endDate && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">End Date</div>
                      <div className="text-lg font-semibold">{format(new Date(selectedTournament.endDate), "PPP")}</div>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Tournament Matches</h4>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="space-y-3 mt-4">
                      {getTournamentMatches(selectedTournament.id).map((match) => (
                        <Card key={match.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-semibold">{match.homePlayer}</div>
                                <div className="text-sm text-muted-foreground">{match.venue}</div>
                              </div>
                              <div className="px-4 text-center">
                                {match.status === "completed" || match.status === "live" ? (
                                  <div className="text-2xl font-bold">
                                    {match.homeScore} - {match.awayScore}
                                  </div>
                                ) : (
                                  <div className="text-sm text-muted-foreground">
                                    {format(new Date(match.date), "MMM d, p")}
                                  </div>
                                )}
                                <Badge variant="outline" className="mt-1 text-xs">
                                  {match.status}
                                </Badge>
                              </div>
                              <div className="flex-1 text-right">
                                <div className="font-semibold">{match.awayPlayer}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                    <TabsContent value="scheduled" className="space-y-3 mt-4">
                      {getTournamentMatches(selectedTournament.id)
                        .filter((m) => m.status === "scheduled")
                        .map((match) => (
                          <Card key={match.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="font-semibold">{match.homePlayer}</div>
                                  <div className="text-sm text-muted-foreground">{match.venue}</div>
                                </div>
                                <div className="px-4 text-center">
                                  <div className="text-sm text-muted-foreground">
                                    {format(new Date(match.date), "MMM d, p")}
                                  </div>
                                </div>
                                <div className="flex-1 text-right">
                                  <div className="font-semibold">{match.awayPlayer}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </TabsContent>
                    <TabsContent value="completed" className="space-y-3 mt-4">
                      {getTournamentMatches(selectedTournament.id)
                        .filter((m) => m.status === "completed")
                        .map((match) => (
                          <Card key={match.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="font-semibold">{match.homePlayer}</div>
                                </div>
                                <div className="px-4 text-center">
                                  <div className="text-2xl font-bold">
                                    {match.homeScore} - {match.awayScore}
                                  </div>
                                </div>
                                <div className="flex-1 text-right">
                                  <div className="font-semibold">{match.awayPlayer}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
