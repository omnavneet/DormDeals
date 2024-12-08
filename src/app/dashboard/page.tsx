import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'

async function dashboard() {

    const { userId } = await auth()

    if (!userId) {
        return (
            <div>Not authenticated</div>
        )
    }

    const user = await currentUser()
    
    return (
        <div className='flex items-center justify-center '>dashboard</div>
    )
}

export default dashboard