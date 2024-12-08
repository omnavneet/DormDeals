import { connectionDB } from "@/libs/connectionDB";
import { AdModel } from "@/models/Ad";

export async function GET(){
    await connectionDB
    const adDocs = await AdModel.find({}, null, {sort: {createdAt: -1}})
    return Response.json(adDocs)
}