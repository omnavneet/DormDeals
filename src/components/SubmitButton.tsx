export default function SubmitButton({ formRef }: { formRef: React.RefObject<HTMLFormElement> }) {
    return (
        <button
            onClick={() => formRef.current?.requestSubmit()}
            type="submit" className="bg-white text-black px-10 py-3 transform hover:bg-red-300 transition duration-200 font-semibold text-xl rounded-sm border-2 border-black hover:scale-105">
            Submit
        </button>
    )
}