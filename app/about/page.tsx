"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Target, Users, Trophy, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">ABOUT BOE</h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                Brotherhood of Excellence is more than just a gaming club—we are a family of elite competitors united by
                our passion for excellence, dedication to improvement, and commitment to each other.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Target className="h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      To cultivate excellence in competitive gaming through dedication, teamwork, and continuous
                      improvement.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Users className="h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Brotherhood</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      We support each other on and off the battlefield, building lasting friendships and trust.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Trophy className="h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Excellence</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      We strive for greatness in every match, pushing boundaries and setting new standards.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Zap className="h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Innovation</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      We embrace new strategies, technologies, and approaches to stay ahead of the competition.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold mb-8 text-center">OUR STORY</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2020, Brotherhood of Excellence began as a small group of passionate gamers who shared a
                    common vision: to create a competitive gaming environment built on respect, skill, and camaraderie.
                  </p>
                  <p>
                    What started as friendly matches between friends quickly evolved into a formidable competitive team.
                    Our dedication to improvement and our supportive community attracted talented players from across
                    the region.
                  </p>
                  <p>
                    Today, BOE stands as one of the premier gaming clubs in the competitive scene. We have won multiple
                    championships, developed countless skilled players, and built a reputation for excellence both in
                    gameplay and sportsmanship.
                  </p>
                  <p>
                    Our state-of-the-art training facility, experienced coaching staff, and commitment to player
                    development ensure that every member of BOE has the resources they need to reach their full
                    potential.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold mb-2">20+</div>
                <div className="text-muted-foreground uppercase tracking-wider text-sm">Active Players</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold mb-2">15+</div>
                <div className="text-muted-foreground uppercase tracking-wider text-sm">Championships</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold mb-2">5</div>
                <div className="text-muted-foreground uppercase tracking-wider text-sm">Years Active</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold mb-2">100%</div>
                <div className="text-muted-foreground uppercase tracking-wider text-sm">Dedication</div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
