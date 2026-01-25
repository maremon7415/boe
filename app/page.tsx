import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { TopPlayersSection } from "@/components/home/top-players-section"
import { UpcomingMatchesSection } from "@/components/home/upcoming-matches-section"
import { LiveMatchesSection } from "@/components/home/live-matches-section"
import { TopScorersSection } from "@/components/home/top-scorers-section"
import { LatestNewsSection } from "@/components/home/latest-news-section"
import { AchievementsSection } from "@/components/home/achievements-section"
import { SponsorsSection } from "@/components/home/sponsors-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <TopPlayersSection />
        <UpcomingMatchesSection />
        <LiveMatchesSection />
        <TopScorersSection />
        <LatestNewsSection />
        <AchievementsSection />
        <SponsorsSection />
      </main>
      <Footer />
    </div>
  )
}
