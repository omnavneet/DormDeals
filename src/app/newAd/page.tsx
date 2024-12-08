'use client'
import AdTextInputs from "@/components/AdTextInputs"
import LocationPicker from "@/components/LocationPicker"
import Uploader from "@/components/Uploader"
import UploadThumbnail from "@/components/UploadThumbnail"
import { faImage, faLocationCrosshairs, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UploadResponse } from "imagekit/dist/libs/interfaces"
import { useState } from 'react'
import { createAd } from "../actions/adActions"
import PublishButton from "@/components/publishButton"
import { useRouter } from "next/navigation"

type Location = {
    lat: number,
    lng: number
}
const locationDefault = {
    lat: 22.253060786873554,
    lng: 84.908268749718,
}

export default function NewAd() {

    const [files, setFiles] = useState<UploadResponse[]>([])
    const [isUploading, setIsUploading] = useState(false)
    const [location, setLocation] = useState<Location>(locationDefault)
    const router = useRouter()

    function handleFindMyPostionClick() {
        navigator.geolocation.getCurrentPosition(
            ev => {
                setLocation({ lat: ev.coords.latitude, lng: ev.coords.longitude })
            }
            , console.error)

    }

    async function handleSubmit(formData: FormData) {

        const { title, price, category, description, contact } = Object.fromEntries(formData)
        formData.set('location', JSON.stringify(location))
        formData.set('files', JSON.stringify(files))

        const result = await createAd(formData)
        router.push(`/ad/${result._id}`)
    }

    return (
        <form action={handleSubmit} className="max-w-[1000px] mx-auto grid grid-cols-2 gap-8 mt-5">

            <div >
                <div className="flex items-center justify-center flex-col bg-red-100 py-5 rounded-xl">
                    <h2 className="uppercase font-semibold text-gray-500">Choose and upload your photos</h2>
                    <div><FontAwesomeIcon icon={faImage}
                        size="10x"
                        className="text-gray-400 my-2" /></div>

                    <label
                        className={
                            "upload-btn cursor-pointer border-2 px-10 py-3 rounded-md font-semibold mt-2 flex gap-2 items-center justify-center border-blue-600 text-blue-600"
                            + (
                                isUploading ? "text-gray-500 cursor-not-allowed border-none" :
                                    "border-blue-600 text-blue-600  hover:bg-blue-600 hover:text-white transition-all duration-200 "
                            )}>

                        <Uploader
                            onUploadStart={() => setIsUploading(true)}
                            onSuccess={file => {
                                setFiles(prev => [...prev, file])
                                setIsUploading(false)
                            }}
                        />

                        {isUploading ?
                            (<span>Uploading...</span>)
                            : (
                                <>

                                    <FontAwesomeIcon icon={faPlus} className="h-6" />
                                    <span className="text-lg">Add Photos</span>
                                </>
                            )}
                    </label>

                    <div className="flex flex-wrap mt-2 gap-2 justify-center">
                        {files.map((file, index) => (
                            <div key={file.fileId || index} className="size-24">
                                <UploadThumbnail 
                                onClick={() => {}}
                                file={file} />
                            </div>
                        ))}
                    </div>

                </div>

                <div className="flex mt-5 justify-between">
                    <div className="font-bold text-gray-600 text-lg uppercase">
                        Location:
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleFindMyPostionClick}
                            className="text-gray-600">
                            <FontAwesomeIcon icon={faLocationCrosshairs} className="h-5" />
                        </button>
                    </div>
                </div>

                <div className=" mt-1 rounded-xl text-gray-500 text-xl overflow-hidden">
                    <LocationPicker
                        location={location}
                        setLocation={setLocation}
                    />
                </div>
            </div>

            <div>
                <AdTextInputs />
                <PublishButton>Publish</PublishButton>
            </div>

        </form>
    )
}