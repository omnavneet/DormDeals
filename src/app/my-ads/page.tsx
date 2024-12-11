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
    <div className='my-10 mx-4'>
      <h1 className='font-bold text-3xl mb-4 mt-2'>Your Ads</h1>
      <div className='grid grid-cols-4 gap-x-2 gap-y-8 justify-start'>
        {sanitizedAds.map((ad) => (
          <AdBlock key={ad._id} ad={ad} />
        ))}
      </div>
    </div>
  )
}

export default page