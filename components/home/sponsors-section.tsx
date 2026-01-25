"use client"

import { useData } from "@/contexts/data-context"
import { motion } from "framer-motion"
import { Handshake } from "lucide-react"
import Image from "next/image"

export function SponsorsSection() {
  const { sponsors } = useData()

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Handshake className="h-8 w-8" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">OUR PARTNERS</h2>
          </div>
          <p className="text-muted-foreground text-lg">Powered by industry leaders</p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-12">
          {sponsors.map((sponsor, index) => (
            <motion.a
              key={sponsor.id}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="relative h-20 w-40 grayscale hover:grayscale-0 transition-all"
            >
              <Image src={sponsor.logo || "/placeholder.svg"} alt={sponsor.name} fill className="object-contain" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
