import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User, { IUser } from "../models/User"; // Adjust path to your User model
import Counter from "../models/Counter"; // Adjust path to your Counter model

dotenv.config({ path: ".env.local" }); // Load environment variables from .env.local
dotenv.config(); // Load environment variables from .env as fallback

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Configuration
const TOTAL_USERS = 30;
const DEFAULT_PASS = "password123";

// Role Distribution
const ROLES_CONFIG = [
  { role: "ADMINISTRATOR", count: 1 },
  { role: "CAPTAIN", count: 1 },
  { role: "ADMIN", count: 3 },
  { role: "MEMBER", count: 20 },
  { role: "PENDING", count: 5 },
];

const devices = [
  { name: "iPhone", model: "13 Pro Max" },
  { name: "Samsung", model: "S23 Ultra" },
  { name: "Xiaomi", model: "Note 10" },
  { name: "OnePlus", model: "11R" },
  { name: "iPad", model: "Pro M2" },
];

// Helper to generate random stats
// Helper to generate random stats
const generateStats = () => {
  const totalMatch = Math.floor(Math.random() * 50) + 10; // 10 to 60 matches
  const win = Math.floor(Math.random() * (totalMatch - 5));
  const draw = Math.floor(Math.random() * (totalMatch - win));
  const loss = totalMatch - win - draw;

  const goalsFor = win * 2 + draw * 1 + Math.floor(Math.random() * 15); // Wins usually imply 2+ goals
  const goalsAgainst = loss * 2 + draw * 1 + Math.floor(Math.random() * 10);

  // Generate consistent form history
  // Create an array with all results: W * win, D * draw, L * loss
  const fullHistory: string[] = [
    ...Array(win).fill("W"),
    ...Array(draw).fill("D"),
    ...Array(loss).fill("L"),
  ];

  // Shuffle the history to simulate a real match sequence
  for (let i = fullHistory.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fullHistory[i], fullHistory[j]] = [fullHistory[j], fullHistory[i]];
  }

  // Take the last 5 matches for the 'form'
  // If total matches < 5, take whatever is available
  const form = fullHistory.slice(-5);

  return {
    totalMatch,
    win,
    draw,
    loss,
    goalsFor,
    goalsAgainst,
    goalDiff: goalsFor - goalsAgainst,
    points: win * 3 + draw * 1,
    form,
  };
};

async function seed() {
  try {
    console.log("🌱 Connecting to Database...");
    await mongoose.connect(MONGODB_URI as string);

    console.log("🧹 Clearing existing data...");
    await User.deleteMany({});
    await Counter.deleteMany({});

    console.log("🔒 Hashing password...");
    const hashedPassword = await bcrypt.hash(DEFAULT_PASS, 10);

    const users: Partial<IUser>[] = [];
    let counter = 1;

    // Loop through roles config and build users
    for (const config of ROLES_CONFIG) {
      for (let i = 0; i < config.count; i++) {
        const stats = generateStats();
        const clubId = `BOE-${counter.toString().padStart(4, "0")}`;
        const device = devices[Math.floor(Math.random() * devices.length)];

        users.push({
          clubId,
          fullName: `${config.role.charAt(0) + config.role.slice(1).toLowerCase()} ${i + 1}`,
          email: `${config.role.toLowerCase()}${i + 1}@test.com`,
          password: hashedPassword,
          role: config.role as any,
          efootballId: `9${Math.floor(Math.random() * 100000000)}`,
          device: {
            name: device.name,
            model: device.model,
          },
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${clubId}`, // Random avatar
          socialAccounts: {
            facebook: "https://facebook.com",
            twitter: "",
            youtube: "",
            discord: "",
          },
          dob: new Date("2000-01-01"),
          bloodGroup: "O+",
          gender: Math.random() > 0.1 ? "Male" : "Female",
          stats: stats as any,
        });

        counter++;
      }
    }

    console.log(`🚀 Seeding ${users.length} users...`);
    await User.insertMany(users);

    console.log("🔄 Resetting Counter...");
    // Set the counter to 30 so the next real user gets BOE-0031
    await Counter.create({ name: "clubId", seq: 30 });

    console.log("✅ Seeding Complete!");
    console.log("-----------------------------------------");
    console.log(
      `Administrator Login: administrator1@test.com / ${DEFAULT_PASS}`,
    );
    console.log(`Member Login: member1@test.com / ${DEFAULT_PASS}`);
    console.log("-----------------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
