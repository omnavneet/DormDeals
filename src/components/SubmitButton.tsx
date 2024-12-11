export default function SubmitButton({ formRef }: { formRef: React.RefObject<HTMLFormElement> }) {
    return (
        <button
            onClick={() => formRef.current?.requestSubmit()}
            type="submit" className="bg-blue-600 text-white px-10 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out font-semibold text-xl">
            Submit
        </button>
    )
}