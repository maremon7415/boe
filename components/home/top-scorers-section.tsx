"use client"

import { useData } from "@/contexts/data-context"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Target, Medal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TopScorersSection() {
  const { players } = useData()

  // Sort players by goals scored
  const topScorers = [...players].sort((a, b) => b.goalsFor - a.goalsFor).slice(0, 5)

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
            <Target className="h-8 w-8" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">TOP SCORERS</h2>
          </div>
          <p className="text-muted-foreground text-lg">Leading goal scorers this season</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {topScorers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="relative inline-block mb-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                      <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {index < 3 && (
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Medal className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{player.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{player.position}</p>
                  <div className="text-3xl font-bold">{player.goalsFor}</div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Goals</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
