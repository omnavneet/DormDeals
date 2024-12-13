import { ReactNode } from "react"
import { useFormStatus } from "react-dom"

export default function PublishButton({ children }: { children: ReactNode }) {

    const { pending } = useFormStatus()
    return (
        <button
            disabled={pending}

            className={(pending ? "bg-gray-500" : "bg-[#4CAF50]") + " border-2 border-[#4CAF50] text-white duration-200 px-12 py-4 rounded-sm font-bold inline-flex text-lg items-center gap-2 hover:bg-white hover:text-[#4CAF50] hover:shadow-md hover:scale-105"}>

            {pending && (
                <span>Saving...</span>
            )}
            {!pending && (
                <span>{children}</span>
            )}
        </button>
    )
}