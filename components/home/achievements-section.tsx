"use client"

import { useData } from "@/contexts/data-context"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Award } from "lucide-react"
import Image from "next/image"

export function AchievementsSection() {
  const { achievements } = useData()

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
            <Award className="h-8 w-8" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">ACHIEVEMENTS</h2>
          </div>
          <p className="text-muted-foreground text-lg">Our legacy of excellence</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="p-4 text-center">
                  <div className="relative h-32 mb-4">
                    <Image
                      src={achievement.image || "/placeholder.svg"}
                      alt={achievement.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-sm mb-1 line-clamp-2">{achievement.title}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.year}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
