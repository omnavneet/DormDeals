'use server'
import DeleteButton from "@/components/DeleteButton";
import Gallery from "@/components/gallery";
import LocationMap from "@/components/LocationMap";
import { connectionDB } from "@/libs/connectionDB";
import { AdModel } from "@/models/Ad";
import { currentUser } from "@clerk/nextjs/server";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
    params: {
        id: string
    }
    searchParams: { [key: string]: string }
}

export default async function SingleAdPage({ params }: Props) {
    await connectionDB()
    const adDoc = await AdModel.findById(params.id)

    const user = await currentUser()

    if (!adDoc) return <div className="text-center text-gray-600 mt-10">Ad not found</div>

    return (
        <div className="flex mx-40 pt-12 gap-10 scale-110">

            <div className="lg:w-1/2 w-full">
                <Gallery files={adDoc.files} />
                {user && user.primaryEmailAddress?.emailAddress === adDoc.userEmail && (
                    <div className="mt-16 flex gap-4 justify-center">
                        <Link
                            href={`/edit/${adDoc._id}`}
                            className="edit-delete-btn border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white ">
                            <FontAwesomeIcon icon={faPencil} />
                            Edit</Link>

                        <DeleteButton id={adDoc._id.toString()} />
                    </div>
                )}
            </div>

            <div className="lg:w-1/2 w-full h-[500px]">
                <h1 className="text-4xl font-bold mb-4">{adDoc.title}</h1>

                <div className="font-semibold px-2 bg-red-400 rounded-full w-32 flex items-center justify-center mb-5">{adDoc.category}
                </div>

                <div className="font-bold text-2xl mb-8">
                    <span>$</span>{adDoc.price}<span></span>
                </div>

                <div>
                    <label>Description</label>
                    <div className="text-gray-500 font-semibold mb-8">{adDoc.description}
                    </div>
                </div>

                <div>
                    <label>Contact</label>
                    <div className="text-gray-500 font-semibold mb-8">mobile:{adDoc.contact}</div>
                </div>


                <label>Location</label>
                <LocationMap location={adDoc.location} />


            </div>
        </div>
    )
}
