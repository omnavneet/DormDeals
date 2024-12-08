import { ReactNode } from "react"
import { useFormStatus } from "react-dom"

export default function PublishButton({ children }: { children: ReactNode }) {

    const { pending } = useFormStatus()
    return (
        <button
            disabled={pending}

            className={(pending ? "bg-gray-500" : "bg-blue-600") + " text-white px-12 py-4 rounded-md shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out font-semibold text-2xl mt-2"}>

            {pending && (
                <span>Saving...</span>
            )}
            {!pending && (
                <span>{children}</span>
            )}
        </button>
    )
}