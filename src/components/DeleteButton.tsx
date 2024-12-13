'use client'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function DeleteButton({ id }: { id: string }) {

    const [showQuestion, setShowQuestion] = useState(false)
    const router = useRouter()

    const handleDelete = () => {
        if (!id) {
            console.error('ID is invalid')
            return
        }

        fetch(`/api/ads?id=${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log('Deleted successfully:', data)
                setShowQuestion(false)
                router.push('/')
            })
            .catch((err) => {
                console.error('Error:', err)
            })
    };


    if (showQuestion) {
        return (
            <div className='bg-black/80 fixed inset-0 top-8 z-50 flex items-center justify-center'>
                <div className='bg-white p-4 font-semibold text-lg'>
                    <h2>Do you want to delete this ad?</h2>
                    <div className='flex gap-2'>

                        <button
                            onClick={() => setShowQuestion(false)}
                            className='text-black px-8 py-3 rounded-sm shadow-lg transform font-semibold text-lg mt-2 bg-white border border-black hover:scale-105 transition duration-200'
                        >
                            No, Cancel!
                        </button>

                        <button
                            onClick={handleDelete}
                            className='text-white px-8 py-3 rounded-sm shadow-lg font-semibold text-lg mt-2 bg-red-500 border border-red-500 hover:scale-105 transition duration-200'
                        >
                            Yes, Delete!
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <button
                onClick={() => setShowQuestion(true)}
                className="edit-delete-btn border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:scale-105">
                <FontAwesomeIcon icon={faTrash} />
                Delete Ad</button>
        </div>
    )
}

export default DeleteButton