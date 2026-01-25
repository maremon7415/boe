"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Player, Tournament, Match, News, Achievement, Sponsor, RegistrationForm } from "@/lib/types"
import {
  dummyPlayers,
  dummyTournaments,
  dummyMatches,
  dummyNews,
  dummyAchievements,
  dummySponsors,
} from "@/lib/dummy-data"

interface DataContextType {
  players: Player[]
  tournaments: Tournament[]
  matches: Match[]
  news: News[]
  achievements: Achievement[]
  sponsors: Sponsor[]
  registrations: RegistrationForm[]
  addPlayer: (player: Player) => void
  updatePlayer: (id: string, player: Partial<Player>) => void
  deletePlayer: (id: string) => void
  addTournament: (tournament: Tournament) => void
  updateTournament: (id: string, tournament: Partial<Tournament>) => void
  deleteTournament: (id: string) => void
  addMatch: (match: Match) => void
  updateMatch: (id: string, match: Partial<Match>) => void
  deleteMatch: (id: string) => void
  addNews: (news: News) => void
  updateNews: (id: string, news: Partial<News>) => void
  deleteNews: (id: string) => void
  addAchievement: (achievement: Achievement) => void
  updateAchievement: (id: string, achievement: Partial<Achievement>) => void
  deleteAchievement: (id: string) => void
  addSponsor: (sponsor: Sponsor) => void
  updateSponsor: (id: string, sponsor: Partial<Sponsor>) => void
  deleteSponsor: (id: string) => void
  addRegistration: (registration: RegistrationForm) => void
  updateRegistration: (id: string, registration: Partial<RegistrationForm>) => void
  deleteRegistration: (id: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [players, setPlayers] = useState<Player[]>(dummyPlayers)
  const [tournaments, setTournaments] = useState<Tournament[]>(dummyTournaments)
  const [matches, setMatches] = useState<Match[]>(dummyMatches)
  const [news, setNews] = useState<News[]>(dummyNews)
  const [achievements, setAchievements] = useState<Achievement[]>(dummyAchievements)
  const [sponsors, setSponsors] = useState<Sponsor[]>(dummySponsors)
  const [registrations, setRegistrations] = useState<RegistrationForm[]>([])

  // Player CRUD
  const addPlayer = (player: Player) => setPlayers((prev) => [...prev, player])
  const updatePlayer = (id: string, player: Partial<Player>) =>
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, ...player } : p)))
  const deletePlayer = (id: string) => setPlayers((prev) => prev.filter((p) => p.id !== id))

  // Tournament CRUD
  const addTournament = (tournament: Tournament) => setTournaments((prev) => [...prev, tournament])
  const updateTournament = (id: string, tournament: Partial<Tournament>) =>
    setTournaments((prev) => prev.map((t) => (t.id === id ? { ...t, ...tournament } : t)))
  const deleteTournament = (id: string) => setTournaments((prev) => prev.filter((t) => t.id !== id))

  // Match CRUD
  const addMatch = (match: Match) => setMatches((prev) => [...prev, match])
  const updateMatch = (id: string, match: Partial<Match>) =>
    setMatches((prev) => prev.map((m) => (m.id === id ? { ...m, ...match } : m)))
  const deleteMatch = (id: string) => setMatches((prev) => prev.filter((m) => m.id !== id))

  // News CRUD
  const addNews = (newsItem: News) => setNews((prev) => [...prev, newsItem])
  const updateNews = (id: string, newsItem: Partial<News>) =>
    setNews((prev) => prev.map((n) => (n.id === id ? { ...n, ...newsItem } : n)))
  const deleteNews = (id: string) => setNews((prev) => prev.filter((n) => n.id !== id))

  // Achievement CRUD
  const addAchievement = (achievement: Achievement) => setAchievements((prev) => [...prev, achievement])
  const updateAchievement = (id: string, achievement: Partial<Achievement>) =>
    setAchievements((prev) => prev.map((a) => (a.id === id ? { ...a, ...achievement } : a)))
  const deleteAchievement = (id: string) => setAchievements((prev) => prev.filter((a) => a.id !== id))

  // Sponsor CRUD
  const addSponsor = (sponsor: Sponsor) => setSponsors((prev) => [...prev, sponsor])
  const updateSponsor = (id: string, sponsor: Partial<Sponsor>) =>
    setSponsors((prev) => prev.map((s) => (s.id === id ? { ...s, ...sponsor } : s)))
  const deleteSponsor = (id: string) => setSponsors((prev) => prev.filter((s) => s.id !== id))

  // Registration CRUD
  const addRegistration = (registration: RegistrationForm) => setRegistrations((prev) => [...prev, registration])
  const updateRegistration = (id: string, registration: Partial<RegistrationForm>) =>
    setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, ...registration } : r)))
  const deleteRegistration = (id: string) => setRegistrations((prev) => prev.filter((r) => r.id !== id))

  return (
    <DataContext.Provider
      value={{
        players,
        tournaments,
        matches,
        news,
        achievements,
        sponsors,
        registrations,
        addPlayer,
        updatePlayer,
        deletePlayer,
        addTournament,
        updateTournament,
        deleteTournament,
        addMatch,
        updateMatch,
        deleteMatch,
        addNews,
        updateNews,
        deleteNews,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        addSponsor,
        updateSponsor,
        deleteSponsor,
        addRegistration,
        updateRegistration,
        deleteRegistration,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
