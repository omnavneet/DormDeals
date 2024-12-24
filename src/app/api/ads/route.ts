import { connectionDB } from "@/libs/connectionDB"
import { Ad, AdModel } from "@/models/Ad"
import { currentUser } from "@clerk/nextjs/server"
import { FilterQuery, PipelineStage } from "mongoose"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  await connectionDB()
  const { searchParams } = new URL(req.url)
  const phrase = searchParams.get("phrase")
  const category = searchParams.get("category")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const radius = searchParams.get("radius")
  const center = searchParams.get("center")

  const filter: FilterQuery<Ad> = {}

  if (minPrice || maxPrice) {
    filter.price = {}
    if (minPrice) filter.price.$gte = parseInt(minPrice)
    if (maxPrice) filter.price.$lte = parseInt(maxPrice)
  }

  if (phrase) {
    filter.title = { $regex: ".*" + phrase + ".*", $options: "i" }
  }
  if (category) {
    filter.category = category
  }

  const aggregationSteps: PipelineStage[] = []

  if (radius && center) {
    const coords = center.split("-")
    const [lat, lng] = coords.map((coord) => parseFloat(coord))
    aggregationSteps.push({
      $geoNear: {
        near: { type: "Point", coordinates: [lat, lng] },
        distanceField: "distance",
        maxDistance: parseInt(radius),
        spherical: true,
      },
    })
  }

  aggregationSteps.push({ $match: filter })
  aggregationSteps.push({ $sort: { createdAt: -1 } })

  try {
    const adDocs = await AdModel.aggregate(aggregationSteps)
    return NextResponse.json(adDocs)
  } catch (error) {
    console.error("Error fetching ads:", error)
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to fetch ads" }),
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get("id")

  if (!id) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Ad ID is required" }),
      { status: 400 }
    )
  }

  await connectionDB()
  const adDoc = await AdModel.findById(id)
  const user = await currentUser()

  if (!adDoc || adDoc.userEmail !== user?.primaryEmailAddress?.emailAddress) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      { status: 403 }
    )
  }

  try {
    await AdModel.findByIdAndDelete(id)
    return new NextResponse(
      JSON.stringify({ success: true, message: "Ad deleted successfully" }),
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting ad:", error)
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to delete ad" }),
      { status: 500 }
    )
  }
}
