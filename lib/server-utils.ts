import Counter from "@/models/Counter";

export async function generateBoeId() {
  const counter = await Counter.findOneAndUpdate(
    { name: "User" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const padded = String(counter.seq).padStart(4, "0");
  return `BOE-${padded}`;
}
