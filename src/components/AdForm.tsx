'use client'
import { faImage, faLocationCrosshairs, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Uploader from './Uploader'
import LocationPicker from './LocationPicker'
import AdTextInputs from './AdTextInputs'
import PublishButton from './publishButton'
import { UploadResponse } from 'imagekit/dist/libs/interfaces'
import { createAd, updateAd } from '@/app/actions/adActions'
import { redirect } from 'next/navigation'
import UploadThumbnail from './UploadThumbnail'
import { revalidatePath } from 'next/cache'

type Location = {
    lat: number,
    lng: number
}
const locationDefault = {
    lat: 22.253060786873554,
    lng: 84.908268749718,
}

type Props = {
    id?: string | null
    defaultFiles?: UploadResponse[]
    defaultLocation?: Location
    defaultTexts?: {
        title?: string
        price?: number
        category?: string
        description?: string
        contact?: string
    }
}

export default function AdForm(
    {
        id = null,
        defaultFiles,
        defaultLocation,
        defaultTexts = {},
    }: Props) {

    const [files, setFiles] = useState<UploadResponse[]>(defaultFiles || [])
    const [isUploading, setIsUploading] = useState(false)
    const [location, setLocation] = useState<Location>(defaultLocation || locationDefault)

    function handleFindMyPostionClick() {
        navigator.geolocation.getCurrentPosition(
            ev => {
                setLocation({ lat: ev.coords.latitude, lng: ev.coords.longitude })
            }
            , console.error)

    }

    async function handleSubmit(formData: FormData) {
        formData.set('location', JSON.stringify(location))
        formData.set('files', JSON.stringify(files))

        if (id) {
            formData.set('_id', id)
        }

        const result = id
            ? await updateAd(formData)
            : await createAd(formData)

        redirect(`/ad/${result._id}`)
    }

    return (
        <form action={handleSubmit} className="max-w-[1200px] mx-auto grid grid-cols-2 gap-10 mt-8">

            <div >
                <div className="flex items-center justify-center flex-col bg-red-100 py-5 rounded-xl">
                    <h2 className="uppercase font-semibold text-gray-500">Choose and upload your photos</h2>
                    <div><FontAwesomeIcon icon={faImage}
                        size="8x"
                        className="text-gray-400 my-2" /></div>

                    <label
                        className={
                            "upload-btn cursor-pointer border-2 px-8 py-3 rounded-sm font-semibold mt-2 flex gap-2 items-center justify-center border-blue-600 text-blue-600"
                            + (
                                isUploading ? "text-gray-500 cursor-not-allowed border-none" :
                                    "border-blue-600 text-blue-600  hover:text-gray-500 hover:border-gray-500 transition-all duration-200 "
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
                            <div key={file.fileId || index} className="size-28">
                                <UploadThumbnail
                                    onClick={() => { }}
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
                <AdTextInputs defaultValues={defaultTexts} />
                <PublishButton>{id ? 'Save Ad!' : 'Publish Ad!'}</PublishButton>
            </div>

        </form>
    )
}