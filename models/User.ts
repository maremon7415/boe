import mongoose, { Schema, Document, Model } from "mongoose";

export type UserRole =
  | "ADMINISTRATOR"
  | "ADMIN"
  | "MEMBER"
  | "CAPTAIN"
  | "PENDING";
export type MatchResult = "W" | "D" | "L";

export interface IUser extends Document {
  clubId: string;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  efootballId: string;
  device: {
    name: string;
    model: string;
  };
  socialAccounts: {
    facebook: string;
    twitter: string;
    youtube: string;
    discord: string;
  };
  dob: Date;
  bloodGroup: string;
  gender: string;
  stats: {
    totalMatch: number;
    win: number;
    draw: number;
    loss: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDiff: number;
    points: number;
    form: MatchResult[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    clubId: {
      type: String,
      required: [true, "Club ID is required"],
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: ["ADMINISTRATOR", "ADMIN", "MEMBER", "CAPTAIN", "PENDING"],
      default: "PENDING",
    },
    efootballId: {
      type: String,
      default: "",
      trim: true,
    },
    device: {
      type: new Schema(
        {
          name: { type: String, required: true },
          model: { type: String, required: true },
        },
        { _id: false },
      ),
      required: [true, "Device info is required"],
    },
    avatar: {
      type: String,
      default: "",
    },
    socialAccounts: {
      type: new Schema(
        {
          facebook: { type: String, default: "" },
          twitter: { type: String, default: "" },
          youtube: { type: String, default: "" },
          discord: { type: String, default: "" },
        },
        { _id: false },
      ),
    },
    dob: {
      type: Date,
      required: [true, "Date of Birth is required"],
    },
    bloodGroup: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Other"],
    },
    stats: {
      totalMatch: { type: Number, default: 0 },
      win: { type: Number, default: 0 },
      draw: { type: Number, default: 0 },
      loss: { type: Number, default: 0 },
      goalsFor: { type: Number, default: 0 },
      goalsAgainst: { type: Number, default: 0 },
      goalDiff: { type: Number, default: 0 },
      points: { type: Number, default: 0 },
      form: {
        type: [String],
        enum: ["W", "L", "D"],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ "stats.points": -1, "stats.goalDiff": -1 });

const User: Model<IUser> =
  mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
