"use client"

import { useData } from "@/contexts/data-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Radio } from "lucide-react"

export function LiveMatchesSection() {
  const { matches } = useData()

  // Get live matches
  const liveMatches = matches.filter((match) => match.status === "live")

  if (liveMatches.length === 0) {
    return null
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
            <Radio className="h-8 w-8 text-red-500 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">LIVE NOW</h2>
          </div>
          <p className="text-muted-foreground text-lg">Matches currently in progress</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-red-500/50 bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="destructive" className="animate-pulse">
                      <Radio className="mr-1 h-3 w-3" />
                      LIVE
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {match.tournamentName}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 text-center">
                      <div className="text-lg font-semibold mb-2">{match.homePlayer}</div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                        className="text-4xl font-bold"
                      >
                        {match.homeScore}
                      </motion.div>
                    </div>
                    <div className="px-4 text-2xl font-bold text-muted-foreground">-</div>
                    <div className="flex-1 text-center">
                      <div className="text-lg font-semibold mb-2">{match.awayPlayer}</div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                        className="text-4xl font-bold"
                      >
                        {match.awayScore}
                      </motion.div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm text-muted-foreground">{match.venue}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
