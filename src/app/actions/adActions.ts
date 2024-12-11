"use server"

import { AdModel } from "@/models/Ad"
import { auth, currentUser } from "@clerk/nextjs/server"
import mongoose from "mongoose"
import { revalidatePath } from "next/cache"

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
}

export async function updateAd(formData: FormData) {
  const { _id, files, location, ...data } = Object.fromEntries(formData)
  await connect()
  const adDoc = await AdModel.findById(_id as string)
  const user = await currentUser()
  if (adDoc?.userEmail !== user?.primaryEmailAddress?.emailAddress) {
    throw new Error("You are not authorized to update this ad")
  }

  const AdData = {
    ...data,
    files: JSON.parse(files as string),
    location: JSON.parse(location as string),
  }
  const newAdDoc = await AdModel.findByIdAndUpdate(_id as string, AdData)
  revalidatePath(`/ad/${_id}`)
  return JSON.parse(JSON.stringify(newAdDoc))
}
