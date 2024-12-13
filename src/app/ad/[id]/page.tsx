'use server'
import DeleteButton from "@/components/DeleteButton";
import Gallery from "@/components/gallery";
import LocationMap from "@/components/LocationMap";
import { connectionDB } from "@/libs/connectionDB";
import { Ad, AdModel } from "@/models/Ad";
import { currentUser } from "@clerk/nextjs/server";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link"


type Params = Promise<{ id: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function SingleAdPage(props: {
    params: Params
    searchParams: SearchParams
}) {
    await connectionDB()
    const params = await props.params
    const id = params.id
    const adDoc = await AdModel.findById(id) as Ad

    const user = await currentUser()

    if (!adDoc) return <div className="text-center text-gray-600 mt-10">Ad not found</div>

    return (
        <div className="flex mx-40 pt-14 gap-10 scale-110">

            <div className="lg:w-1/2 w-full">
                <Gallery files={adDoc.files} />
                {user && user.primaryEmailAddress?.emailAddress === adDoc.userEmail && (
                    <div className="mt-16 flex gap-4 justify-center">
                        <Link
                            href={`/edit/${adDoc._id}`}
                            className="edit-delete-btn border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-105">
                            <FontAwesomeIcon icon={faPencil} />
                            Edit Ad</Link>

                        <DeleteButton id={adDoc._id!.toString()} />
                    </div>
                )}
            </div>

            <div className="lg:w-1/2 w-full h-[500px]">
                <h1 className="text-4xl font-bold mb-2">{adDoc.title}</h1>

                <div className="inline-flex items-center justify-center px-1 py-1 text-sm font-medium rounded-full border-2 bg-red-100 text-red-800 border-red-400 w-32 mb-4">{adDoc.category}
                </div>

                <div className="font-bold text-2xl mb-8">
                    <span>$</span>{adDoc.price}<span></span>
                </div>

                <div className="mb-8">
                    <label>Description</label>
                    <div className="text-gray-500 font-semibold">{adDoc.description}
                    </div>
                </div>

                <div className="mb-8">
                    <label>Contact</label>
                    <div className="text-gray-500 font-semibold ">mobile:{adDoc.contact}</div>
                </div>


                <label>Location</label>
                <LocationMap location={adDoc.location} />


            </div>
        </div>
    )
}
