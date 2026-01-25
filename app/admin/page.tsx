"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { PlayersTab } from "@/components/admin/players-tab"
import { MatchesTab } from "@/components/admin/matches-tab"
import { TournamentsTab } from "@/components/admin/tournaments-tab"
import { NewsTab } from "@/components/admin/news-tab"
import { AchievementsTab } from "@/components/admin/achievements-tab"
import { SponsorsTab } from "@/components/admin/sponsors-tab"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("players")

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="py-12 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-8 w-8" />
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">ADMIN PANEL</h1>
              </div>
              <p className="text-muted-foreground">Manage all aspects of the BOE Gaming Club</p>
            </motion.div>
          </div>
        </section>

        {/* Admin Tabs */}
        <section className="py-8 bg-background min-h-screen">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
                <TabsTrigger value="players">Players</TabsTrigger>
                <TabsTrigger value="matches">Matches</TabsTrigger>
                <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
              </TabsList>

              <TabsContent value="players">
                <PlayersTab />
              </TabsContent>

              <TabsContent value="matches">
                <MatchesTab />
              </TabsContent>

              <TabsContent value="tournaments">
                <TournamentsTab />
              </TabsContent>

              <TabsContent value="news">
                <NewsTab />
              </TabsContent>

              <TabsContent value="achievements">
                <AchievementsTab />
              </TabsContent>

              <TabsContent value="sponsors">
                <SponsorsTab />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
