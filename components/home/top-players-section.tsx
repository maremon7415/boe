"use client"

import { useData } from "@/contexts/data-context"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy } from "lucide-react"

export function TopPlayersSection() {
  const { players } = useData()

  // Sort players by points
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points)

  const getFormBadgeVariant = (result: "W" | "D" | "L") => {
    if (result === "W") return "default"
    if (result === "D") return "secondary"
    return "destructive"
  }

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-8 w-8" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">LIVE RANKINGS</h2>
          </div>
          <p className="text-muted-foreground text-lg">Top 20 players in the current season</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-12 font-bold">#</TableHead>
                    <TableHead className="font-bold">Player</TableHead>
                    <TableHead className="text-center font-bold">P</TableHead>
                    <TableHead className="text-center font-bold">W</TableHead>
                    <TableHead className="text-center font-bold">D</TableHead>
                    <TableHead className="text-center font-bold">L</TableHead>
                    <TableHead className="text-center font-bold">GF</TableHead>
                    <TableHead className="text-center font-bold">GA</TableHead>
                    <TableHead className="text-center font-bold">GD</TableHead>
                    <TableHead className="text-center font-bold">PTS</TableHead>
                    <TableHead className="text-center font-bold">Form</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPlayers.map((player, index) => (
                    <motion.tr
                      key={player.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.03 }}
                      className={`hover:bg-muted/50 transition-colors ${index < 3 ? "bg-accent/20" : ""}`}
                    >
                      <TableCell className="font-bold">
                        {index + 1}
                        {index === 0 && <span className="ml-1 text-yellow-500">👑</span>}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                            <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{player.name}</div>
                            <div className="text-xs text-muted-foreground">{player.position}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{player.played}</TableCell>
                      <TableCell className="text-center text-green-500">{player.won}</TableCell>
                      <TableCell className="text-center text-yellow-500">{player.drawn}</TableCell>
                      <TableCell className="text-center text-red-500">{player.lost}</TableCell>
                      <TableCell className="text-center">{player.goalsFor}</TableCell>
                      <TableCell className="text-center">{player.goalsAgainst}</TableCell>
                      <TableCell className="text-center font-semibold">
                        {player.goalDifference > 0 ? `+${player.goalDifference}` : player.goalDifference}
                      </TableCell>
                      <TableCell className="text-center font-bold text-lg">{player.points}</TableCell>
                      <TableCell>
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
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
