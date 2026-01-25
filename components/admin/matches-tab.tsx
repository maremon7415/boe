"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/contexts/data-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import type { Match } from "@/lib/types"

export function MatchesTab() {
  const { matches, tournaments, addMatch, updateMatch, deleteMatch } = useData()
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMatch, setEditingMatch] = useState<Match | null>(null)
  const [formData, setFormData] = useState({
    tournamentId: "",
    homePlayer: "",
    awayPlayer: "",
    venue: "",
    date: "",
    status: "scheduled" as "scheduled" | "live" | "completed",
    homeScore: 0,
    awayScore: 0,
  })

  const handleOpenDialog = (match?: Match) => {
    if (match) {
      setEditingMatch(match)
      setFormData({
        tournamentId: match.tournamentId,
        homePlayer: match.homePlayer,
        awayPlayer: match.awayPlayer,
        venue: match.venue,
        date: match.date,
        status: match.status,
        homeScore: match.homeScore || 0,
        awayScore: match.awayScore || 0,
      })
    } else {
      setEditingMatch(null)
      setFormData({
        tournamentId: "",
        homePlayer: "",
        awayPlayer: "",
        venue: "",
        date: "",
        status: "scheduled",
        homeScore: 0,
        awayScore: 0,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingMatch) {
      updateMatch(editingMatch.id, formData)
      toast({ title: "Match updated successfully" })
    } else {
      addMatch(formData)
      toast({ title: "Match added successfully" })
    }

    setIsDialogOpen(false)
    setEditingMatch(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this match?")) {
      deleteMatch(id)
      toast({ title: "Match deleted successfully" })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Manage Matches</CardTitle>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Match
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tournament</TableHead>
                  <TableHead>Match</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matches.map((match) => (
                  <TableRow key={match.id}>
                    <TableCell>
                      <Badge variant="outline">{match.tournamentName}</Badge>
                    </TableCell>
                    <TableCell>
                      {match.homePlayer} vs {match.awayPlayer}
                    </TableCell>
                    <TableCell>{match.venue}</TableCell>
                    <TableCell>{format(new Date(match.date), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <Badge variant={match.status === "live" ? "destructive" : "secondary"}>{match.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {match.status !== "scheduled" ? `${match.homeScore} - ${match.awayScore}` : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleOpenDialog(match)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(match.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingMatch ? "Edit Match" : "Add New Match"}</DialogTitle>
            <DialogDescription>{editingMatch ? "Update match information" : "Schedule a new match"}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tournament">Tournament</Label>
              <Select
                value={formData.tournamentId}
                onValueChange={(value) => setFormData({ ...formData, tournamentId: value })}
              >
                <SelectTrigger id="tournament">
                  <SelectValue placeholder="Select tournament" />
                </SelectTrigger>
                <SelectContent>
                  {tournaments.map((tournament) => (
                    <SelectItem key={tournament.id} value={tournament.id}>
                      {tournament.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="homePlayer">Home Player</Label>
                <Input
                  id="homePlayer"
                  value={formData.homePlayer}
                  onChange={(e) => setFormData({ ...formData, homePlayer: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="awayPlayer">Away Player</Label>
                <Input
                  id="awayPlayer"
                  value={formData.awayPlayer}
                  onChange={(e) => setFormData({ ...formData, awayPlayer: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date & Time</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.status !== "scheduled" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="homeScore">Home Score</Label>
                  <Input
                    id="homeScore"
                    type="number"
                    min="0"
                    value={formData.homeScore}
                    onChange={(e) => setFormData({ ...formData, homeScore: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="awayScore">Away Score</Label>
                  <Input
                    id="awayScore"
                    type="number"
                    min="0"
                    value={formData.awayScore}
                    onChange={(e) => setFormData({ ...formData, awayScore: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingMatch ? "Update" : "Add"} Match</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
