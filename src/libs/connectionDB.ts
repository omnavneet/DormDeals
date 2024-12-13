import mongoose from "mongoose"

export async function connectionDB() {
  return await mongoose.connect(process.env.MONGODB_URL as string)
}
