"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Shield, UserPlus, Users, Trophy, Newspaper, Award, DollarSign, Swords, LockKeyhole } from "lucide-react"
import { UsersTable } from "@/components/admin/users-table"
import { MatchesTab } from "@/components/admin/matches-tab"
import { TournamentsTab } from "@/components/admin/tournaments-tab"
import { NewsTab } from "@/components/admin/news-tab"
import { AchievementsTab } from "@/components/admin/achievements-tab"
import { SponsorsTab } from "@/components/admin/sponsors-tab"
import { useAuth } from "@/contexts/auth-context"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const { user, loading, loggedIn } = useAuth()
  const router = useRouter()

  // Protect Route
  useEffect(() => {
    if (!loading) {
      if (!loggedIn || !user) {
        // toast.error("Please login to access admin panel")
        router.push("/login")
        return
      }

      if (user.role !== "ADMIN" && user.role !== "ADMINISTRATOR") {
        toast.error("Access Denied: You need Admin privileges.")
        router.push("/")
      }
    }
  }, [loading, loggedIn, user, router])

  if (loading || !loggedIn || !user || (user.role !== "ADMIN" && user.role !== "ADMINISTRATOR")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying Privileges...</p>
        </div>
      </div>
    )
  }

  const roleDescription = user.role === "ADMINISTRATOR"
    ? "Full System Access & Control"
    : "User & Content Management";

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="py-12 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">ADMIN PANEL</h1>
                  </div>
                  <p className="text-muted-foreground">Manage all aspects of the BOE Gaming Club</p>
                </div>

                <div className="bg-background/50 p-4 rounded-lg border border-border backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <LockKeyhole className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{user.fullName}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${user.role === 'ADMINISTRATOR' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'
                          }`}>
                          {user.role}
                        </span>
                        <span className="text-xs text-muted-foreground border-l pl-2 border-border">
                          {roleDescription}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Admin Tabs */}
        <section className="py-8 bg-background min-h-screen">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="overflow-x-auto pb-4">
                <TabsList className="w-full justify-start min-w-max">
                  <TabsTrigger value="pending" className="gap-2"><UserPlus className="h-4 w-4" /> Pending</TabsTrigger>
                  <TabsTrigger value="players" className="gap-2"><Users className="h-4 w-4" /> Players</TabsTrigger>
                  <TabsTrigger value="all-users" className="gap-2"><Shield className="h-4 w-4" /> All Users</TabsTrigger>
                  <TabsTrigger value="matches" className="gap-2"><Swords className="h-4 w-4" /> Matches</TabsTrigger>
                  <TabsTrigger value="tournaments" className="gap-2"><Trophy className="h-4 w-4" /> Tournaments</TabsTrigger>
                  <TabsTrigger value="news" className="gap-2"><Newspaper className="h-4 w-4" /> News</TabsTrigger>
                  <TabsTrigger value="achievements" className="gap-2"><Award className="h-4 w-4" /> Achievements</TabsTrigger>
                  <TabsTrigger value="sponsors" className="gap-2"><DollarSign className="h-4 w-4" /> Sponsors</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="pending" className="mt-6">
                <UsersTable roleFilter="PENDING" title="Pending Registrations" />
              </TabsContent>

              <TabsContent value="players" className="mt-6">
                <UsersTable roleFilter="player" title="Club Players" />
              </TabsContent>

              <TabsContent value="all-users" className="mt-6">
                <UsersTable title="User Management (Full Control)" />
              </TabsContent>

              <TabsContent value="matches" className="mt-6">
                <MatchesTab />
              </TabsContent>

              <TabsContent value="tournaments" className="mt-6">
                <TournamentsTab />
              </TabsContent>

              <TabsContent value="news" className="mt-6">
                <NewsTab />
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <AchievementsTab />
              </TabsContent>

              <TabsContent value="sponsors" className="mt-6">
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
