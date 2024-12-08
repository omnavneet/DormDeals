"use server"

import { AdModel } from "@/models/Ad"
import { auth } from "@clerk/nextjs/server"
import mongoose from "mongoose"

async function connect() {
  return mongoose.connect(process.env.MONGODB_URL as string)
}

export async function createAd(formData: FormData) {
  const { files, location, ...data } = Object.fromEntries(formData)
  await connect()
  const { userId, sessionClaims } = await auth()

  if (!userId) throw new Error("User not found")

  const userEmail = sessionClaims?.email
  
  const newAdData = {
    ...data,
    files: JSON.parse(files as string),
    location: JSON.parse(location as string),
    userEmail,
  }
  const newAdDoc = await AdModel.create(newAdData)
  return JSON.parse(JSON.stringify(newAdDoc))
  // return await AdModel.create(newAdData)
}
