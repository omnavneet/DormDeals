'use server'
import AdForm from '@/components/AdForm'
import { connectionDB } from '@/libs/connectionDB'
import { AdModel } from '@/models/Ad'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'


type Params = Promise<{ id: string }>

export default async function EditPage(props: {
    params: Params
}) {
    await connectionDB()
    const params = await props.params
    const id = params.id
    const user = await currentUser()
    const adDoc = await AdModel.findById(id)

    if (!adDoc) {
        return <div className="text-center text-gray-600 mt-10">Ad not found</div>
    }
    if (user && user.primaryEmailAddress?.emailAddress !== adDoc?.userEmail) {
        return <div className="text-center text-gray-600 mt-10">You are not allowed to edit this ad</div>
    }
    return (
        <AdForm
            id={id}
            defaultFiles={adDoc.files}
            defaultLocation={adDoc.location}
            defaultTexts={{
                title: adDoc.title,
                description: adDoc.description,
                price: adDoc.price,
                category: adDoc.category,
                contact: adDoc.contact
            }}
        />
    )
}