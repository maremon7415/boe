"use client"

import { useData } from "@/contexts/data-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, MapPin, Ticket } from "lucide-react"
import { format } from "date-fns"

export function UpcomingMatchesSection() {
  const { matches } = useData()

  // Get next 3 scheduled matches
  const upcomingMatches = matches
    .filter((match) => match.status === "scheduled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-8 w-8" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">UPCOMING MATCHES</h2>
          </div>
          <p className="text-muted-foreground text-lg">Next scheduled battles</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="uppercase text-xs">
                      {match.matchType.replace(/-/g, " ")}
                    </Badge>
                    <Badge variant="secondary">{match.tournamentName}</Badge>
                  </div>
                  <CardTitle className="text-xl">
                    {match.homePlayer} vs {match.awayPlayer}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(match.date), "PPP 'at' p")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{match.venue}</span>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Ticket className="mr-2 h-4 w-4" />
                    Get Tickets
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
