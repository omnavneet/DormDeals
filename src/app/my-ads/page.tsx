'use server'
import AdBlock from '@/components/AdBlock'
import { connectionDB } from '@/libs/connectionDB'
import { AdModel } from '@/models/Ad'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {

  const user = await currentUser()
  const email = user?.primaryEmailAddress?.emailAddress
  await connectionDB()

  const adDocs = await AdModel.find({ userEmail: email })
  if (!adDocs) {
    return <div>No ads found</div>
  }

  const sanitizedAds = adDocs.map(ad => {
    const plainAd = ad.toObject()
    plainAd._id = ad._id.toString()
    plainAd.files = ad.files || []

    return plainAd
  })

  return (
    <div className='mb-10 mt-4 mx-4'>
      <h1 className='font-semibold text-4xl py-4 hover:underline flex justify-center'>Your Ads</h1>
      <div className='grid lg:grid-cols-4 justify-start gap-2 md:grid-cols-3 grid-cols-2 md:mx-4 lg:mx-0 lg:scale-100 md:scale-95 scale-95'>
        {sanitizedAds.map((ad) => (
          <AdBlock key={ad._id} ad={ad} />
        ))}
      </div>
    </div>
  )
}

export default page