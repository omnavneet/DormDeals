import { connectionDB } from "@/libs/connectionDB"
import { Ad, AdModel } from "@/models/Ad"
import { currentUser } from "@clerk/nextjs/server"
import { FilterQuery, PipelineStage } from "mongoose"
import { NextResponse } from "next/server"

export async function GET(req: Request) {

  await connectionDB()
  const { searchParams } = new URL(req.url)
  const phrase = searchParams.get("phrase")
  const filter: FilterQuery<Ad> = {}
  const category = searchParams.get("category")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const radius = searchParams.get("radius")
  const center = searchParams.get("center")

  const aggregationSteps: PipelineStage[] = []

  if (phrase) {
    filter.title = { $regex: ".*" + phrase + ".*", $options: "i" }
  }
  if (category) {
    filter.category = category
  }
  if (minPrice && maxPrice) {
    filter.price = {
      $gte: parseInt(minPrice),
      $lte: parseInt(maxPrice),
    }
  }
  if (minPrice && !maxPrice) {
    filter.price = {
      $gte: parseInt(minPrice),
    }
  }
  if (!minPrice && maxPrice) {
    filter.price = {
      $lte: parseInt(maxPrice),
    }
  }

  if (radius && center) {
    const coords = center.split("-")
    aggregationSteps.push({
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(coords[0]), parseFloat(coords[1])],
        },
        distanceField: "distance",
        maxDistance: parseInt(radius),
        spherical: true,
      },
    })
  }

  aggregationSteps.push({
    $match: filter,
  })
  aggregationSteps.push({
    $sort: { createdAt: -1 },
  })

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

  await connectionDB()
  const adDoc = await AdModel.findById(id)
  const user = await currentUser()

  if (!adDoc || adDoc.userEmail !== user?.primaryEmailAddress?.emailAddress) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      { status: 403 }
    )
  }

  await AdModel.findByIdAndDelete(id)

  return new NextResponse(
    JSON.stringify({ success: true, message: "Ad deleted successfully" }),
    { status: 200 }
  )
}
