export interface Player {
  id: string;
  name: string;
  position: string;
  avatar: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ("W" | "D" | "L")[];
  status: "trial" | "full";
  email?: string;
  skillLevel?: string;
  availability?: string;
}

export interface Tournament {
  id: string;
  name: string;
  type: "league" | "cup" | "solo";
  season: string;
  status: "upcoming" | "ongoing" | "completed";
  startDate: string;
  endDate?: string;
  image?: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  tournamentName: string;
  homePlayer: string;
  awayPlayer: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  venue: string;
  status: "scheduled" | "live" | "completed";
  matchType: "player-vs-player" | "intra-club" | "club-vs-club";
}

export interface News {
  id: string;
  title: string;
  date: string;
  content: string;
  image: string;
  excerpt: string;
}

export interface Achievement {
  id: string;
  title: string;
  image: string;
  year: string;
  description: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface RegistrationForm {
  id: string;
  name: string;
  email: string;
  skillLevel: string;
  preferredRole: string;
  availability: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: "ADMINISTRATOR" | "ADMIN" | "MEMBER" | "CAPTAIN" | "PENDING";
  clubId?: string;
  avatar?: string;
  avatarPublicId?: string;
  efootballId?: string;
  device?: {
    name: string;
    model: string;
  };
  socialAccounts?: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    discord?: string;
  };
  createdAt?: string;
  bloodGroup?: string;
  gender?: string;
  dob?: string;
  stats?: {
    totalMatch: number;
    win: number;
    draw: number;
    loss: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDiff: number;
  };
}
